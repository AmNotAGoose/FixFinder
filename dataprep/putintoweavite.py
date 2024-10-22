//this was used to create and put in the embeddings, as well as test it out in python before moving

from ollama import Client
import weaviate
import weaviate.classes as wvc
from weaviate.classes.config import Property, DataType

with open('out.txt', 'r') as file:
    documents = file.readlines()

weaviate_client = weaviate.connect_to_local(host='192.168.0.155', port=38701)
ollama_client = Client(host='http://192.168.0.155:38702')

collection = weaviate_client.collections.get("Docs")

# with collection.batch.dynamic() as batch:
#     for i, d in enumerate(documents):
#         response = ollama_client.embeddings(model="all-minilm", prompt=d)
#
#         batch.add_object(
#             properties={"text": d},
#             vector=response["embedding"],
#         )

prompt = "My Samsung Galaxy S8 has bad battery, can you help me replace"

embedding_response = ollama_client.embeddings(
  model="all-minilm",
  prompt=prompt,
)

results = collection.query.near_vector(near_vector=embedding_response["embedding"], limit=1)
embedding_data = results.objects[0].properties['text']

print(embedding_data)

weaviate_client.close()
