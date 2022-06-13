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
	ourAlbumsOnPage.innerHTML = albums.map(album => `<li data-id="${album.id}">${album.id}. "${album.title}"</li>`).join('')
}

async function addPhotos(photo) {
	ourPhotosOnPage.innerHTML = photo.map(photos =>
		`<li data-id="${photos.id}"><a href='${photos.url}' class='link-photos'><p class='photo-text'>${photos.id}. </p> <img src='${photos.thumbnailUrl}'</a></li>`).join('')
}

async function addPhotosAndAlbumsOnPage() {
	try {
		const ourAlbums = await getAlbums();
		await addAlbums(ourAlbums);
		const ourPhotos = await getPhotos(1)
		await addPhotos(ourPhotos)
	} catch {
		console.warn('Error')
	}
}

addPhotosAndAlbumsOnPage()

ourAlbumsOnPage.addEventListener('click', (event) => {
	getPhotos(event.target.dataset.id)
		.then((photos) => addPhotos(photos))
		.catch(error => console.warn(error))
})