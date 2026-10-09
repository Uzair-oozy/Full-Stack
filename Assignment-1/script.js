const users = [
  {
    id: 'u1',
    name: 'Aisha Khan',
    username: 'aisha',
    password: '123456',
    email: 'aisha@connecfriend.com',
    location: 'Islamabad',
    role: 'Product Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    lastLogin: new Date('2026-10-09T08:15:00'),
    friends: ['u2', 'u3', 'u4'],
    rating: 3,
    ignoreList: []
  },
  {
    id: 'u2',
    name: 'Musa Ali',
    username: 'musa',
    password: '123456',
    email: 'musa@connecfriend.com',
    location: 'Lahore',
    role: 'Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    lastLogin: new Date('2026-10-09T09:05:00'),
    friends: ['u1', 'u3', 'u5'],
    rating: 2,
    ignoreList: ['u8']
  },
  {
    id: 'u3',
    name: 'Zara Ahmed',
    username: 'zara',
    password: '123456',
    email: 'zara@connecfriend.com',
    location: 'Karachi',
    role: 'Community Lead',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    lastLogin: new Date('2026-10-09T07:40:00'),
    friends: ['u1', 'u2', 'u6'],
    rating: 3,
    ignoreList: []
  },
  {
    id: 'u4',
    name: 'Ali Hassan',
    username: 'ali',
    password: '123456',
    email: 'ali@connecfriend.com',
    location: 'Rawalpindi',
    role: 'Digital Strategist',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    lastLogin: new Date('2026-10-09T06:20:00'),
    friends: ['u1', 'u7'],
    rating: 1,
    ignoreList: ['u5']
  },
  {
    id: 'u5',
    name: 'Sara Malik',
    username: 'sara',
    password: '123456',
    email: 'sara@connecfriend.com',
    location: 'Peshawar',
    role: 'UX Researcher',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80',
    lastLogin: new Date('2026-10-09T10:25:00'),
    friends: ['u2', 'u6'],
    rating: 2,
    ignoreList: []
  },
  {
    id: 'u6',
    name: 'Hamza Noor',
    username: 'hamza',
    password: '123456',
    email: 'hamza@connecfriend.com',
    location: 'Multan',
    role: 'DevOps Engineer',
    avatar: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=300&q=80',
    lastLogin: new Date('2026-10-09T05:50:00'),
    friends: ['u3', 'u5', 'u7'],
    rating: 3,
    ignoreList: ['u1']
  },
  {
    id: 'u7',
    name: 'Maryam Raza',
    username: 'maryam',
    password: '123456',
    email: 'maryam@connecfriend.com',
    location: 'Faisalabad',
    role: 'Marketing Specialist',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
    lastLogin: new Date('2026-10-09T04:35:00'),
    friends: ['u4', 'u6'],
    rating: 1,
    ignoreList: []
  },
  {
    id: 'u8',
    name: 'Omer Iqbal',
    username: 'omer',
    password: '123456',
    email: 'omer@connecfriend.com',
    location: 'Sialkot',
    role: 'Content Creator',
    avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=300&q=80',
    lastLogin: new Date('2026-10-09T03:20:00'),
    friends: [],
    rating: 2,
    ignoreList: []
  }
];

const posts = [
  {
    id: 'p1',
    authorId: 'u2',
    audience: 'all',
    text: 'The team demo went live today and the product walk-through was a huge success. Proud of the effort everyone put in!',
    createdAt: new Date('2026-10-09T09:25:00'),
    likes: 18,
    dislikes: 2,
    likedBy: ['u1', 'u3', 'u5'],
    dislikedBy: ['u4']
  },
  {
    id: 'p2',
    authorId: 'u3',
    audience: 'all',
    text: 'Sunset walk and coffee break after a productive week. Small steps really do create big momentum.',
    createdAt: new Date('2026-10-09T08:40:00'),
    likes: 12,
    dislikes: 1,
    likedBy: ['u1', 'u2'],
    dislikedBy: []
  },
  {
    id: 'p3',
    authorId: 'u5',
    audience: 'selected',
    targetIds: ['u1', 'u2', 'u3'],
    text: 'User research interviews are showing a clear preference for cleaner, more intuitive onboarding. Excited to shape the next iteration.',
    createdAt: new Date('2026-10-09T07:05:00'),
    likes: 9,
    dislikes: 0,
    likedBy: ['u2', 'u3'],
    dislikedBy: []
  },
  {
    id: 'p4',
    authorId: 'u1',
    audience: 'all',
    text: 'Weekend planning in progress: coffee, design brainstorming, and a great creative sprint. Looking forward to building something new!',
    createdAt: new Date('2026-10-09T06:30:00'),
    likes: 24,
    dislikes: 3,
    likedBy: ['u2', 'u3', 'u4', 'u5', 'u6'],
    dislikedBy: ['u7']
  }
];

const messages = [
  { fromId: 'u2', toId: 'u1', text: 'Hi Aisha! I saw your new mockups; they look strong.', time: '2026-10-09T09:12:00' },
  { fromId: 'u1', toId: 'u2', text: 'Thanks! I am refining the interaction flow now.', time: '2026-10-09T09:14:00' },
  { fromId: 'u3', toId: 'u1', text: 'Are you free for a quick check-in later today?', time: '2026-10-09T08:00:00' },
  { fromId: 'u5', toId: 'u1', text: 'The research notes are compiled. I can share them with you shortly.', time: '2026-10-09T07:40:00' }
];

const state = {
  currentUserId: null,
  selectedView: 'home',
  selectedChatId: null,
  shareAudience: 'all'
};

const loginScreen = document.getElementById('loginScreen');
const appShell = document.getElementById('appShell');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const pageTitle = document.getElementById('pageTitle');
const feedContainer = document.getElementById('feedContainer');
const latestLogins = document.getElementById('latestLogins');
const friendsList = document.getElementById('friendsList');
const inviteSuggestions = document.getElementById('inviteSuggestions');
const profileFriendsList = document.getElementById('profileFriendsList');
const conversationList = document.getElementById('conversationList');
const chatHeader = document.getElementById('chatHeader');
const chatMessages = document.getElementById('chatMessages');
const shareFriendList = document.getElementById('shareFriendList');
const shareAudience = document.getElementById('shareAudience');

function getCurrentUser() {
  return users.find((user) => user.id === state.currentUserId);
}

function getUserById(userId) {
  return users.find((user) => user.id === userId);
}

function getFriendList(user) {
  return (user?.friends || []).map((friendId) => getUserById(friendId)).filter(Boolean);
}

function getLoginOrderedFriends(user) {
  return getFriendList(user).sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin));
}

function getPeopleYouMayKnow(user) {
  return users.filter((person) => {
    if (person.id === user.id) return false;
    if (user.friends.includes(person.id)) return false;
    return true;
  });
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2200);
}

function formatRelativeTime(dateValue) {
  const diffMs = Date.now() - new Date(dateValue).getTime();
  const diffMinutes = Math.max(1, Math.round(diffMs / 60000));

  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;

  const diffDays = Math.round(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
}

function renderLatestLogins() {
  const user = getCurrentUser();
  const ordered = getLoginOrderedFriends(user);

  latestLogins.innerHTML = (ordered.length ? ordered : getPeopleYouMayKnow(user).slice(0, 3))
    .slice(0, 4)
    .map(
      (person) => `
        <div class="mini-person">
          <div class="person-meta">
            <img class="avatar-badge" src="${person.avatar}" alt="${person.name}" />
            <div>
              <strong>${person.name}</strong>
              <small>${formatRelativeTime(person.lastLogin)}</small>
            </div>
          </div>
          <span>${person.rating === 1 ? '😵' : person.rating === 2 ? '🙂' : '🤝'}</span>
        </div>
      `
    )
    .join('') || '<p class="small-text mb-0">No friends yet.</p>';
}

function renderProfileView() {
  const user = getCurrentUser();
  document.getElementById('profileAvatar').src = user.avatar;
  document.getElementById('profileName').textContent = user.name;
  document.getElementById('profileUsername').textContent = `@${user.username}`;
  document.getElementById('followersCount').textContent = user.friends.length;
  document.getElementById('postsCount').textContent = posts.filter((post) => post.authorId === user.id).length;
  document.getElementById('ratingCount').textContent = user.rating;
  document.getElementById('profileFullName').textContent = user.name;
  document.getElementById('profileEmail').textContent = user.email;
  document.getElementById('profileLocation').textContent = user.location;
  document.getElementById('profileRole').textContent = user.role;

  const friendCards = getFriendList(user)
    .map(
      (friend) => `
        <div class="friend-card">
          <div class="person-row">
            <div class="person-meta">
              <img src="${friend.avatar}" alt="${friend.name}" />
              <div>
                <strong>${friend.name}</strong>
                <p class="small-text">${friend.role}</p>
              </div>
            </div>
            <div class="badge bg-light text-dark">${friend.rating === 1 ? '😵 Stupid' : friend.rating === 2 ? '🙂 Cool' : '🤝 Trustworthy'}</div>
          </div>
        </div>
      `
    )
    .join('');

  profileFriendsList.innerHTML = friendCards || '<p class="small-text">You have no friends yet.</p>';
}

function renderFriendsView() {
  const user = getCurrentUser();
  const friends = getFriendList(user);

  friendsList.innerHTML = friends
    .map(
      (friend) => `
        <div class="friend-card">
          <div class="person-row">
            <div class="person-meta">
              <img src="${friend.avatar}" alt="${friend.name}" />
              <div>
                <strong>${friend.name}</strong>
                <p class="small-text">${friend.role}</p>
              </div>
            </div>
            <span class="badge ${friend.lastLogin ? 'bg-success-subtle text-success' : 'bg-light text-dark'}">${formatRelativeTime(friend.lastLogin)}</span>
          </div>
          <div class="rating-row" data-friend-id="${friend.id}">
            ${[1, 2, 3]
              .map(
                (value) => `
                  <button class="rating-btn ${friend.rating === value ? 'active' : ''}" data-rating="${value}" data-friend-id="${friend.id}" title="${value === 1 ? 'Stupid' : value === 2 ? 'Cool' : 'Trustworthy'}">
                    ${value === 1 ? '😵' : value === 2 ? '🙂' : '🤝'}
                  </button>
                `
              )
              .join('')}
          </div>
        </div>
      `
    )
    .join('');

  inviteSuggestions.innerHTML = getPeopleYouMayKnow(user)
    .map(
      (person) => {
        const isIgnored = person.ignoreList.includes(user.id);
        return `
          <div class="suggestion-card">
            <div class="person-row">
              <div class="person-meta">
                <img src="${person.avatar}" alt="${person.name}" />
                <div>
                  <strong>${person.name}</strong>
                  <p class="small-text">${person.role}</p>
                </div>
              </div>
              <button class="btn btn-sm ${isIgnored ? 'btn-outline-secondary disabled' : 'btn-primary'} invite-btn" data-person-id="${person.id}" ${isIgnored ? 'disabled' : ''}>
                ${isIgnored ? 'Ignored' : 'Invite'}
              </button>
            </div>
          </div>
        `;
      }
    )
    .join('');
}

function renderShareChecklist() {
  const user = getCurrentUser();
  const options = getFriendList(user)
    .map(
      (friend) => `
        <label>
          <input type="checkbox" class="share-friend-checkbox" value="${friend.id}" checked />
          ${friend.name}
        </label>
      `
    )
    .join('');

  shareFriendList.innerHTML = options;
}

function renderFeed() {
  const user = getCurrentUser();
  const friends = new Set(getFriendList(user).map((friend) => friend.id));
  friends.add(user.id);

  const visiblePosts = posts
    .filter((post) => friends.has(post.authorId))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  feedContainer.innerHTML = visiblePosts
    .map((post) => {
      const author = getUserById(post.authorId);
      const liked = post.likedBy.includes(user.id);
      const disliked = post.dislikedBy.includes(user.id);
      const audienceLabel = post.audience === 'all' ? 'Shared with all friends' : `Shared with ${post.targetIds?.length || 0} friends`;

      return `
        <article class="post-card">
          <div class="post-header">
            <div class="post-user">
              <img src="${author.avatar}" alt="${author.name}" />
              <div>
                <strong>${author.name}</strong>
                <small>${formatRelativeTime(author.lastLogin)} · ${audienceLabel}</small>
              </div>
            </div>
            <span class="post-meta">${formatRelativeTime(post.createdAt)}</span>
          </div>
          <div class="post-body">
            <p>${post.text}</p>
          </div>
          <div class="post-footer">
            <div class="reaction-group">
              <button class="reaction-btn ${liked ? 'active' : ''}" data-post-id="${post.id}" data-reaction="like">👍 ${post.likes}</button>
              <button class="reaction-btn ${disliked ? 'active' : ''}" data-post-id="${post.id}" data-reaction="dislike">👎 ${post.dislikes}</button>
            </div>
            <div class="post-stat">${post.likes + post.dislikes} reactions</div>
          </div>
        </article>
      `;
    })
    .join('');
}

function renderMessages() {
  const user = getCurrentUser();
  const contacts = [...new Set([...messages.map((message) => message.fromId), ...messages.map((message) => message.toId)])]
    .filter((id) => id !== user.id)
    .map((contactId) => getUserById(contactId))
    .filter(Boolean);

  if (!state.selectedChatId && contacts.length) {
    state.selectedChatId = contacts[0].id;
  }

  conversationList.innerHTML = contacts
    .map(
      (contact) => `
        <button class="chat-person ${contact.id === state.selectedChatId ? 'active' : ''}" data-chat-id="${contact.id}">
          <div class="person-row">
            <div class="person-meta">
              <img src="${contact.avatar}" alt="${contact.name}" />
              <div>
                <strong>${contact.name}</strong>
                <p class="small-text">${contact.role}</p>
              </div>
            </div>
          </div>
        </button>
      `
    )
    .join('');

  const selectedContact = getUserById(state.selectedChatId);
  if (!selectedContact) {
    chatHeader.innerHTML = '<p class="small-text mb-0">No conversations yet.</p>';
    chatMessages.innerHTML = '';
    return;
  }

  chatHeader.innerHTML = `
    <img src="${selectedContact.avatar}" class="avatar-badge" alt="${selectedContact.name}" />
    <div>
      <strong>${selectedContact.name}</strong>
      <p class="small-text mb-0">${selectedContact.role}</p>
    </div>
  `;

  const conversation = messages
    .filter((message) => [message.fromId, message.toId].includes(user.id) && [message.fromId, message.toId].includes(selectedContact.id))
    .sort((a, b) => new Date(a.time) - new Date(b.time));

  chatMessages.innerHTML = conversation
    .map((entry) => {
      const isOutgoing = entry.fromId === user.id;
      return `<div class="message-bubble ${isOutgoing ? 'outgoing' : 'incoming'}">${entry.text}</div>`;
    })
    .join('');

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function renderAll() {
  const user = getCurrentUser();
  if (!user) return;

  pageTitle.textContent = {
    home: 'Home',
    profile: 'Profile',
    friends: 'Friends',
    messages: 'Messages'
  }[state.selectedView];

  document.querySelectorAll('.nav-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.view === state.selectedView);
  });

  document.querySelectorAll('.content-view').forEach((section) => {
    const isActive = section.id === `${state.selectedView}View`;
    section.classList.toggle('d-none', !isActive);
    section.classList.toggle('active', isActive);
  });

  renderLatestLogins();
  renderProfileView();
  renderFriendsView();
  renderShareChecklist();
  renderFeed();
  renderMessages();
}

function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    loginError.textContent = 'Please enter both username and password.';
    loginError.classList.remove('d-none');
    return;
  }

  const foundUser = users.find((user) => user.username === username && user.password === password);

  if (!foundUser) {
    loginError.textContent = 'Invalid username or password. Try one of the demo credentials.';
    loginError.classList.remove('d-none');
    return;
  }

  state.currentUserId = foundUser.id;
  state.selectedView = 'home';
  foundUser.lastLogin = new Date();
  loginError.classList.add('d-none');
  loginForm.reset();

  loginScreen.classList.add('d-none');
  appShell.classList.remove('d-none');
  renderAll();
}

function handleLogout() {
  state.currentUserId = null;
  state.selectedView = 'home';
  state.selectedChatId = null;
  appShell.classList.add('d-none');
  loginScreen.classList.remove('d-none');
  document.getElementById('password').value = '';
  document.getElementById('username').focus();
}

function handleNavigation(event) {
  const button = event.target.closest('[data-view]');
  if (!button) return;

  state.selectedView = button.dataset.view;
  renderAll();
}

function handleFriendRating(event) {
  const button = event.target.closest('[data-rating]');
  if (!button) return;

  const friendId = button.dataset.friendId;
  const rating = Number(button.dataset.rating);
  const friend = getUserById(friendId);
  if (!friend) return;

  friend.rating = rating;
  showToast(`${friend.name} rated as ${rating === 1 ? 'Stupid' : rating === 2 ? 'Cool' : 'Trustworthy'}.`);
  renderAll();
}

function handleInvite(event) {
  const button = event.target.closest('.invite-btn');
  if (!button) return;

  const personId = button.dataset.personId;
  const user = getCurrentUser();
  const person = getUserById(personId);

  if (!person || person.ignoreList.includes(user.id)) {
    showToast('This person has ignored your requests.');
    return;
  }

  if (!user.friends.includes(personId)) {
    user.friends.push(personId);
    showToast(`Friend request sent to ${person.name}.`);
    renderAll();
  }
}

function handleReaction(event) {
  const button = event.target.closest('.reaction-btn');
  if (!button) return;

  const postId = button.dataset.postId;
  const reaction = button.dataset.reaction;
  const user = getCurrentUser();
  const post = posts.find((entry) => entry.id === postId);
  if (!post) return;

  const likedIndex = post.likedBy.indexOf(user.id);
  const dislikedIndex = post.dislikedBy.indexOf(user.id);

  if (reaction === 'like') {
    if (likedIndex === -1) {
      post.likes += 1;
      post.likedBy.push(user.id);
    }

    if (dislikedIndex !== -1) {
      post.dislikes -= 1;
      post.dislikedBy.splice(dislikedIndex, 1);
    }
  }

  if (reaction === 'dislike') {
    if (dislikedIndex === -1) {
      post.dislikes += 1;
      post.dislikedBy.push(user.id);
    }

    if (likedIndex !== -1) {
      post.likes -= 1;
      post.likedBy.splice(likedIndex, 1);
    }
  }

  renderFeed();
}

function handleShareSubmit(event) {
  event.preventDefault();
  const user = getCurrentUser();
  const text = document.getElementById('postText').value.trim();
  const audience = shareAudience.value;

  if (!text) {
    showToast('Please write something before posting.');
    return;
  }

  const selectedFriends = Array.from(document.querySelectorAll('.share-friend-checkbox:checked')).map((checkbox) => checkbox.value);

  posts.unshift({
    id: `p${Date.now()}`,
    authorId: user.id,
    audience,
    targetIds: selectedFriends,
    text,
    createdAt: new Date(),
    likes: 0,
    dislikes: 0,
    likedBy: [],
    dislikedBy: []
  });

  document.getElementById('postText').value = '';
  renderFeed();
  showToast('Your update was shared successfully.');
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const user = getCurrentUser();
  const text = document.getElementById('messageInput').value.trim();

  if (!state.selectedChatId || !text) {
    showToast('Choose a contact and type a message first.');
    return;
  }

  messages.push({
    fromId: user.id,
    toId: state.selectedChatId,
    text,
    time: new Date().toISOString()
  });

  document.getElementById('messageInput').value = '';
  renderMessages();
}

function handleConversationSelection(event) {
  const button = event.target.closest('[data-chat-id]');
  if (!button) return;
  state.selectedChatId = button.dataset.chatId;
  renderMessages();
}

loginForm.addEventListener('submit', handleLogin);
document.getElementById('logoutBtn').addEventListener('click', handleLogout);
document.querySelectorAll('.nav-btn').forEach((button) => button.addEventListener('click', handleNavigation));
document.addEventListener('click', handleFriendRating);
document.addEventListener('click', handleInvite);
document.addEventListener('click', handleReaction);
document.getElementById('shareForm').addEventListener('submit', handleShareSubmit);
document.getElementById('messageForm').addEventListener('submit', handleMessageSubmit);
document.addEventListener('click', handleConversationSelection);
shareAudience.addEventListener('change', (event) => {
  state.shareAudience = event.target.value;
  const shareCheckboxes = document.querySelectorAll('.share-friend-checkbox');
  shareCheckboxes.forEach((checkbox) => {
    checkbox.checked = event.target.value === 'all';
  });
});

renderAll();
