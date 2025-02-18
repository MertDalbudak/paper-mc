const fs = require('fs');
const {exec, execSync} = require('child_process');
const https = require('https');
const RestApi = require('./lib/RestApi');

const DOWNLOAD_PAPER_JAR = "download/paper.jar";
const SERVER_PAPER_JAR = "server/paper.jar";
const SERVER_VERSION = "server/version_history.json";

let versions_request = new RestApi('paper', "getVersions"), builds_request;
let versions, latest_version, builds, latest_build, download_url;

function download(url, callback) {
    console.log("DOWNLOADING LATEST PAPER VERSION");
    var file = fs.createWriteStream(DOWNLOAD_PAPER_JAR);
    https.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            try{
                execSync(`chmod +x ${DOWNLOAD_PAPER_JAR}`);
            }
            catch(error){
                console.error(error);
            }
            console.log("DOWNLOADING COMPLETE");
            file.close(() => callback());  // close() is async, call cb after close completes.
        });
    }).on('error', function(err) { // Handle errors
        fs.unlink(DOWNLOAD_PAPER_JAR); // Delete the file async.
        if (callback)
            callback(err.message);
    });
}

function backupServer(callback){
    // CREATE BACKUP
    let backup_path, counter = 0;
    do{
        let filename_suffix = counter > 0 ? `(${counter})` : "";
        backup_path = `backups/paper-backup${filename_suffix}.zip`;
        counter++;
    }while(fs.existsSync(backup_path));

    console.log("CREATE BACKUP OF SERVER");

    exec(`zip -9 -r '${backup_path}' server`, (error, stdout, stderr) => {
        if(error != null && stderr != null){
            console.error(error);
            throw new Error(error);
        }
        console.log("BACKUP COMPLETED");
        callback();
    });
}

function startServer(){
    console.log("Starting Server");
    execSync('/bin/sh ./start.sh');
}

const getServerVersion = ()=> fs.existsSync(SERVER_VERSION) ? JSON.parse(fs.readFileSync(SERVER_VERSION)).currentVersion : null;

async function main(){
    versions = await versions_request.req();
    latest_version = versions.versions.at(-1);
    
    builds_request = new RestApi('paper', 'getBuilds', {'params': {'version': latest_version}});
    builds = await builds_request.req();
    latest_build = builds.builds.at(-1);

    download_url = `https://api.papermc.io/v2/projects/paper/versions/${latest_version}/builds/${latest_build}/downloads/paper-${latest_version}-${latest_build}.jar`;
    // NEW PAPER VERSION AVAILABLE?
    if(fs.existsSync(SERVER_PAPER_JAR) == false || getServerVersion()?.includes(`${latest_version}-${latest_build}`) == false){
        // DOWNLOAD LATEST PAPER
        download(download_url, (error)=>{
            if(error){
                throw new Error(error);
            }
            backupServer(()=>{
                fs.copyFile(DOWNLOAD_PAPER_JAR, SERVER_PAPER_JAR, (error)=>{
                    if(error){
                        console.error(error);
                        throw new Error(error);
                    }
                    fs.unlinkSync(DOWNLOAD_PAPER_JAR);
                    startServer();
                })
            });
        });
    }
    else{
        startServer();
    }
}


main();
