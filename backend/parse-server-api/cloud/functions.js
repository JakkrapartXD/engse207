Parse.Cloud.define('hello', req => {
    req.log.info(req);
    return 'Hi from Parse Server';
});


Parse.Cloud.define("OnlineAgentByAgentId", async request => {

    let AgentID = request.params.AgentID;

    let returnCode = 0;
    //------------------

    const query = new Parse.Query("OnlineAgentLists"); // select * from OnlineAgentLists

    query.equalTo("AgentID", AgentID); // where AgentID = 'AgentID'

    let results;

    try {
        results = await query.first();

        if (results == undefined) {
            returnCode = '9';
        } else {
            returnCode = results.get("AgentStatus");
        }

        return returnCode;

    } catch (error) {
        throw error.message;
    }

});


Parse.Cloud.define("postOnlineAgentList", async request => {

    let AgentID = request.params.AgentID;
    let AgentName = request.params.AgentName;
    let Queue = request.params.Queue;
    let AgentStatus = request.params.AgentStatus;
    let AgentStatusCode = request.params.AgentStatusCode;
    let IsLogin = request.params.IsLogin;
    let startedAt = new Date();

    let returnCode = 0;
    //------------------
    console.log("AgentID: " + AgentID);
    console.log("AgentName: " + AgentName);
    console.log("Queue: " + Queue);
    console.log("AgentStatus: " + AgentStatus);
    console.log("AgentStatusCode: " + AgentStatusCode);
    console.log("IsLogin: " + IsLogin);

    if (IsLogin != undefined)
        IsLogin = parseInt(IsLogin); //long

    if (IsLogin == 0) {

        const agent_query = new Parse.Query("OnlineAgentLists");
        agent_query.equalTo("AgentID", AgentID);

        agent_query.find().then(function (agents) {

            // DELETE FROM OnlineAgentLists 
            // WHERE (AgentID = 'xxxxx') AND (IsLogin = 0)

            //What do I do HERE to delete the posts?
            agents.forEach(function (agent) {
                agent.destroy({
                    success: function () {
                        // SUCCESS CODE HERE, IF YOU WANT
                        console.log("Delete success: " + AgentID);
                    },
                    error: function () {
                        // ERROR CODE HERE, IF YOU WANT
                        console.log("Delete error: " + AgentID);
                    }
                });
            });

        }, function (error) {
            response.error(error);
        });

        return returnCode;

    }
    else {  // IsLogin == 1

        const query = new Parse.Query("OnlineAgentLists");
        query.equalTo("AgentID", AgentID);

        let results;

        try {
            results = await query.first();

            if (results == undefined) { // Record not found
                // Insert Data

                let onlineagentlist = new Parse.Object("OnlineAgentLists");

                if (AgentID != undefined) onlineagentlist.set("AgentID", AgentID);
                else returnCode = 11;
                if (AgentName != undefined) onlineagentlist.set("AgentName", AgentName);
                else returnCode = 12;
                if (Queue != undefined) onlineagentlist.set("Queue", Queue);
                else returnCode = 13;
                if (AgentStatus != undefined) onlineagentlist.set("AgentStatus", AgentStatus);
                else returnCode = 14;
                if (AgentStatusCode != undefined) onlineagentlist.set("AgentStatusCode", AgentStatusCode);
                else returnCode = 15;
                if (IsLogin != undefined) onlineagentlist.set("IsLogin", IsLogin);
                else returnCode = 16;
                if (startedAt != undefined) onlineagentlist.set("startedAt", startedAt);
                else returnCode = 17;

                if (returnCode == 0) onlineagentlist.save(); //Insert data


            }
            else { //  Found record
                // Update Data

                if (AgentName != undefined) results.set("AgentName", AgentName);
                else returnCode = 1;
                if (Queue != undefined) results.set("Queue", Queue);
                else returnCode = 2;
                if (AgentStatus != undefined) results.set("AgentStatus", AgentStatus);
                else returnCode = 3;
                if (AgentStatusCode != undefined) results.set("AgentStatusCode", AgentStatusCode);
                else returnCode = 4;
                if (IsLogin != undefined) results.set("IsLogin", IsLogin);
                else returnCode = 5;
                if (startedAt != undefined) results.set("startedAt", startedAt);
                else returnCode = 6;

                //if (returnCode == 0) results.save();
                if (returnCode == 0) {
                    results.save();
                    returnCode = 9;
                }

            }

            return returnCode;

        } catch (error) {
            throw error.message;
        }

    }


});
