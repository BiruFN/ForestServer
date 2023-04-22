
async function GetSeason(userAgent) {
    try {
        const season = userAgent.split("++Fortnite+Release-")[1].split(".")[0];
        return Number(season);
    }
    catch {
        return 1;
    }
}

async function GetBuild(userAgent) {
    try {
        const build = userAgent.split("++Fortnite+Release-")[1].split("-")[0];
        return Number(build);
    }
    catch {
        return 1.0;
    }
}


module.exports = {
    GetSeason,
    GetBuild
}