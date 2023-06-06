const { Octokit } = require("@octokit/rest");

const gh = async (session) => {
    try {
        const octokit = new Octokit({ auth: session.provider_token });
        const me = await octokit.users.getAuthenticated();
        console.log("me: ", me.data);

        const repos = await octokit.repos.listForAuthenticatedUser();
        console.log("repos: ", repos.data);
    } catch (error) {
        console.log("error: ", error);
        return 400;
    }
    return 200;
}

const webhook = async (req, res) => {
    const { session } = req.body;
    res.sendStatus(200);
}

const GetAllRepos = async (session, res) => {
    try {
        if (!session.provider_token) {
            throw new Error("No token");
        }
        const octokit = new Octokit({ auth: session.provider_token });
        const repos = await octokit.repos.listForAuthenticatedUser();
        res.send({
            repos: repos.data,
            status: 200,
        });
    } catch (error) {
        console.log("error: ", error);
        res.send({ status: 400 });
    } finally {
        res.end();
    }
}

module.exports = {gh, webhook, GetAllRepos};
