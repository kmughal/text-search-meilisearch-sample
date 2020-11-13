
const fastify = require("fastify")({
  logger: false,
})

const MeiliSearch = require("meilisearch")
const dataset = require("./data.json")
const client = new MeiliSearch({ host: "http://127.0.0.1:7700" })
let index = null;

// enable cors!
fastify.addHook("onRequest", (req, reply, next) => {
  reply.header("Access-Control-Allow-Methods", "*")
  reply.header("Access-Control-Request-Headers", "*")
  reply.header("Access-Control-Allow-Origin", "*")
  return next()
})

fastify.get("/search", async (req, res) => {
  const { q } = req.query
  
  if (!q) return res.code(404).type("text/plain").send("a custom not found")
  const result = await index.search(q)
  res.send(result)
})

fastify.listen(3000, async (err, number) => {
  if (err) {
    console.log(err)
    return
  }
  await addDataset()
  console.log("Connected : ", number)
})

async function addDataset() {
 index = await client.getOrCreateIndex("_id")
  const documents = await index.getDocuments()
  if (documents.length === 0) {
    const { updateId } = await index.addDocuments(dataset)
    await index.waitForPendingUpdate(updateId)
  }
}
