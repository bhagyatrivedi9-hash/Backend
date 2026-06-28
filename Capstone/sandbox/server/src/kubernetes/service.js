import { k8sCoreApi } from "./config.js";

export async function createService(sandboxId) {
    const serviceManifest = {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
            name: `sandbox-service-${sandboxId}`,
            labels: {
                app: "sandbox",
                sandboxId: sandboxId,
            },
        },
        spec: {
            selector: {
                app: "sandbox",
                sandboxId: sandboxId,
            },
            type: "ClusterIP",
            ports: [
                {
                    name: "http",
                    port: 80,
                    targetPort: 5173,
                },
            ],
        },
    };

    const response = await k8sCoreApi.createNamespacedService({
        namespace: "default",
        body: serviceManifest,
    });

    return response;
}