const firebase = {
  local: {
    apiKey: 'AIzaSyA2iZL3UnWWmuq1BZG3k8C4UIF5RKsLFes',
    authDomain: 'template-6fa33.firebaseapp.com',
    projectId: 'template-6fa33',
    storageBucket: 'template-6fa33.appspot.com',
    messagingSenderId: '1082709566635',
    appId: '1:1082709566635:web:a6ed8dba1f14e52cc703ee',
  },
  prod: {
    apiKey: 'AIzaSyA2iZL3UnWWmuq1BZG3k8C4UIF5RKsLFes',
    authDomain: 'template-6fa33.firebaseapp.com',
    projectId: 'template-6fa33',
    storageBucket: 'template-6fa33.appspot.com',
    messagingSenderId: '1082709566635',
    appId: '1:1082709566635:web:a6ed8dba1f14e52cc703ee',
  },
};

const config = process.env.REACT_APP_BUILD_ENV === 'prod' ? firebase.prod : firebase.local;
export { config };
