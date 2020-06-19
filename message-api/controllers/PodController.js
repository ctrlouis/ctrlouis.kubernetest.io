"use strict";


export class PodController {

    static infos(req, res) {

        const infos = {
            node_name: process.env.MY_NODE_NAME,
            pod_name: process.env.MY_POD_NAME,
            pod_namespace: process.env.MY_POD_NAMESPACE,
            pod_ip: process.env.MY_POD_IP,
            pod_service_account: process.env.MY_POD_SERVICE_ACCOUNT
        };

        res.json(infos);
    }

}