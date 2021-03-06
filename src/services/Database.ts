// import * as firebase from "firebase";
declare var firebase: any;

export class DatabaseService {
  // public service: firebase.firestore.Firestore;
  public service: any;
  public watchers: any = {};

  public constructor(options?: { firebaseConfig: any }) {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(options.firebaseConfig);
    }
    this.service = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    this.service.settings(settings);
    firebase
      .firestore()
      .enablePersistence()
      .then(() => {
        this.service = firebase.firestore();
        this.service.settings(settings);
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  public async all(collectionName: string): Promise<any> {
    const collection = await this.get(collectionName);
    const data = {};

    await collection.forEach(doc => {
      data[doc.id] = doc.data();
    });

    return data;
  }

  public async call(functionName: string, payload: any = {}) {
    return firebase.functions().httpsCallable(functionName)(payload);
  }

  public async list(collectionName: string) {
    const collection = await this.get(collectionName);
    const data = [];

    await collection.forEach(doc => {
      data.push({ ...doc.data(), id: doc.id });
    });

    return data;
  }

  public async add(collectionName: string, data: any, id?: string) {
    let document = await this.collection(collectionName);
    document = id ? document.doc(id) : document.doc();

    return document.set(data);
  }

  public collection(collectionName: string) {
    return this.service.collection(collectionName);
  }

  public get(collectionName: string) {
    return this.collection(collectionName).get();
  }

  public document(collectionName: string, id: string) {
    return this.collection(collectionName).doc(id);
  }

  public getDocument(collectionName: string, id: string) {
    return this.document(collectionName, id).get();
  }

  public async find(collectionName: string, id: string) {
    const document = await this.getDocument(collectionName, id);

    return { ...document.data(), id: document.id };
  }

  public async update(collectionName: string, id: string, data: any) {
    const document = this.document(collectionName, id);
    await document.set(data, { merge: true });
    const newDocument = await document.get();

    return newDocument.data();
  }

  public watchCollection(
    collectionName: string,
    where: {
      key: string;
      operator: "==" | "!=" | ">" | ">=" | "<" | "<=";
      value: any;
    }[],
    callback: any
  ) {
    this.watchers[`${collectionName}`] = this.collection(collectionName);
    if (where) {
      where.map(condition => {
        this.watchers[`${collectionName}`] = this.watchers[
          `${collectionName}`
        ].where(condition.key, condition.operator, condition.value);
      });
    }
    this.watchers[`${collectionName}`].onSnapshot(snapshot => {
      if (callback && typeof callback === "function") {
        callback({ data: snapshot.docs });
      }
    });
  }

  public unwatchCollection(collectionName: string) {
    if (
      this.watchers[collectionName] &&
      typeof this.watchers[collectionName] === "function"
    ) {
      this.watchers[collectionName]();

      return true;
    } else {
      console.log(
        `There is no watcher running on ${collectionName} collection.`
      );

      return false;
    }
  }

  public watchDocument(collectionName: string, id: string, callback) {
    this.watchers[`${collectionName}:${id}`] = this.document(
      collectionName,
      id
    ).onSnapshot(doc => {
      if (callback && typeof callback === "function") {
        callback({ data: doc.data() });
      }
    });
  }

  public unwatchDocument(collectionName: string, id: string) {
    const watcherName = `${collectionName}:${id}`;
    if (
      this.watchers[watcherName] &&
      typeof this.watchers[watcherName] === "function"
    ) {
      this.watchers[watcherName]();

      return true;
    } else {
      console.log(`There is no watcher running on ${watcherName} document.`);

      return false;
    }
  }
}
