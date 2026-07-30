export async function handlerReadiness(_, res) {
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send("OK");
}
