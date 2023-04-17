import {throwError} from "@/services/ptech/helpers";

export default function (http) {

    function createAlbum(data) {
        return http.post(`/api/gallery/albums`, data)
            .then(res => res.data.data, e => throwError(e))
    }

    function getAlbums() {
        return http.get(`/api/gallery/albums`)
            .then(res => res.data.data, e => throwError(e))
    }

    function Album(uuid) {
        this.albumUuid = uuid;
        this.http = http;
    }

    Album.prototype.get = function () {
        return this.http.get(`/api/gallery/albums/${this.albumUuid}`)
            .then(res => res.data.data, e => throwError(e))
    }

    Album.prototype.update = function (data) {
        return this.http.patch(`/api/gallery/albums/${this.albumUuid}`, data)
            .then(res => res, e => throwError(e))
    }

    Album.prototype.delete = function () {
        return this.http.delete(`/api/gallery/albums/${this.albumUuid}`)
            .then(res => res, e => throwError(e))
    }

    Album.prototype.createPicture = function (data) {
        return this.http.post(`/api/gallery/albums/${this.albumUuid}/pictures`, data)
            .then(res => res.data.data, e => throwError(e))
    }

    Album.prototype.getPictures = function () {
        return this.http.get(`/api/gallery/albums/${this.albumUuid}/pictures`)
            .then(res => res.data.data, e => throwError(e))
    }

    function Picture(uuid) {
        this.pictureUuid = uuid;
        this.http = http;
    }

    Picture.prototype.get = function () {
        return this.http.get(`/api/gallery/albums/pictures/${this.pictureUuid}`)
            .then(res => res.data.data, e => throwError(e))
    }

    Picture.prototype.update = function (data) {
        return this.http.patch(`/api/gallery/albums/pictures/${this.pictureUuid}`, data)
            .then(res => res, e => throwError(e))
    }

    Picture.prototype.delete = function () {
        return this.http.delete(`/api/gallery/albums/pictures/${this.pictureUuid}`)
            .then(res => res, e => throwError(e))
    }

    return {
        createAlbum, getAlbums,
        album: uuid => new Album(uuid),
        picture: uuid => new Picture(uuid)
    };
}