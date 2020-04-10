import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
cred = credentials.Certificate('fbeventscrawlerdemo-0622c8021d3f.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

doc_ref = db.collection(u'events').document(u'london-united_kingdom-apr-20')
doc_ref.set({
    u'name': u'whatssssss',
    u'id': u'5488878484',
    u'image': u'https.....'
    u'date-time': u'4 Apr-8 Apr'
})


events_ref = db.collection(u'events')
docs = events_ref.stream()

for doc in docs:
	print(u'{} => {}'.format(doc.id, doc.to_dict()))