async function getAlbums() {
	let url = 'https://jsonplaceholder.typicode.com/albums';
	let response = await fetch(url);
	if (response.ok) {
		return response.json();
	} else {
		console.warn('Error')
	}
}

async function getPhotos(id) {
	let photosRequests = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
	if (photosRequests.ok) {
		return photosRequests.json();
	} else {
		console.warn('Error')
	}
}

const ourAlbumsOnPage = document.querySelector('.list-albums');
const ourPhotosOnPage = document.querySelector('.list-img');

async function addAlbums(albums) {
	ourAlbumsOnPage.innerHTML = await albums.map(album =>
		`<li data-id="${album.id}">${album.id}. "${album.title}"</li>`).join('')
}

async function addPhotos(photo) {
	ourPhotosOnPage.innerHTML = await photo.map(photos =>
		`<li data-id="${photos.id}"><p class='photo-text'>${photos.id}.</p> <img src='${photos.url}' </li>`).join('')
}

getAlbums()
	.then((albums) => addAlbums(albums))
	.then(() => getPhotos(1))
	.then((photos) => addPhotos(photos))
	.catch(error => console.warn(error))

ourAlbumsOnPage.addEventListener('click', (event) => {
	getPhotos(event.target.dataset.id)
		.then((photos) => addPhotos(photos))
		.catch(error => console.warn(error))
})

// let li = document.createElement('li');
// 	document.body.children[0].childNodes[1].append(li)
// 	li.innerHTML = blob;