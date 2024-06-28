import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth,onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc,getDocs, query, orderBy,where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCjqXLRESJLxKzGacwyQkCrjhsdBwTolNk",
    authDomain: "notes-90730.firebaseapp.com",
    projectId: "notes-90730",
    storageBucket: "notes-90730.appspot.com",
    messagingSenderId: "923928824043",
    appId: "1:923928824043:web:63047c7db6baa8d70a96ae",
    measurementId: "G-XBYXS784TZ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logoutBtn = document.getElementById('logoutBtn');
const addBlogBtn = document.getElementById('addBlogBtn');
const blogList = document.getElementById('blogList');

logoutBtn.addEventListener("click", function(event) {
    event.preventDefault();
    signOut(auth).then(() => {
      window.location.href = 'index.html';
    }).catch((error) => {
      alert("Signout Error,Try Again!!");
    });
});
  
addBlogBtn.addEventListener('click', async () => {
    const title = document.getElementById('blogTitle').value;
    const content = document.getElementById('blogContent').value;
    console.log(title,content);
    console.log(db);
    try {
      await addDoc(collection(db, 'blogs'), {
        title,
        content,
        created_at: new Date(),
        title_lowercase: title.toLowerCase(),
        user_email: auth.currentUser.email,
      });
      alert('Note added successfully!');
      loadBlogs(); 
      title.value = '';
      content.value = '';
    } catch (error) {
      console.error('Error adding Note:', error);
      alert('Failed to add Note.');
    }
});

sortSelect.addEventListener('change', () => {
    loadBlogs(sortSelect.value);
});
  
function renderBlogList(snapshot) {
    blogList.innerHTML = '<h2>Notes</h2>'; 
  
    if (snapshot.empty) {
      blogList.innerHTML += `
        <div class="no-Notes">
          <img src="/error.png" alt="No Notes">
        </div>
      `;
    } else {
      snapshot.forEach((doc) => {
        const blog = doc.data();
        const blogItem = document.createElement('div');
        blogItem.classList.add('blog-item');
        blogItem.innerHTML = `
          <h3>${blog.title}</h3>
          <p>${blog.content}</p>
          <small>Created by: ${blog.user_email} on ${blog.created_at.toDate().toLocaleString()}</small>
        `;
        blogList.appendChild(blogItem);
      });
    }
}
  
function loadBlogs(sortBy = 'created') {
    let blogsQuery;
  
    switch (sortBy) {
      case 'title':
        blogsQuery = query(collection(db, 'blogs'), orderBy('title_lowercase'));
        break;
      case 'created':
      default:
        blogsQuery = query(collection(db, 'blogs'), orderBy('created_at', 'desc'));
        break;
    }
  
    getDocs(blogsQuery)
      .then((snapshot) => {
        renderBlogList(snapshot);
      })
      .catch((error) => {
        console.error('Error fetching Notes:', error);
        blogList.innerHTML = '<h2>Error fetching Notes.</h2>';
    });
}

const showMyBlogsBtn = document.getElementById('showMyBlogsBtn');

showMyBlogsBtn.addEventListener('click', () => {
    loadMyBlogs();
});

function loadMyBlogs() {
    console.log(auth.currentUser.email);
    const currentUserEmail = auth.currentUser.email;

    const blogsQuery = query(collection(db, 'blogs'),where('user_email', '==', currentUserEmail),orderBy('created_at', 'desc'));

    getDocs(blogsQuery)
        .then((snapshot) => {
            renderBlogList(snapshot);
        })
        .catch((error) => {
            console.error('Error fetching notess:', error);
            blogList.innerHTML = '<h2>Error fetching notes.</h2>';
    });
}

loadBlogs();
  

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'index.html';
    }
    else {
      console.log(user);
        loadBlogs(); 
    }
});