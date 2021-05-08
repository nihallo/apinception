import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const createApiStructure = (newApiStructure) => API.post('/apiStructure',newApiStructure);
export const updateApiStructure = (id, updatedApiStructure) => API.patch(`/apiStructure/${id}`, updatedApiStructure);
export const deleteApiStructure = (id) => API.delete(`/apiStructure/${id}`);

export const fetchApiListing = () => API.get('/apiStructure');

export const createTable = (newTable) => API.post('/tables',newTable);
export const fetchTables = () => API.get('/tables');
export const deleteTable= (id) => API.delete(`/tables/${id}`);


