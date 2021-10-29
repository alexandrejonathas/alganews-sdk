import Service from '../Service'

import { Post } from '../@types'
import generateQueryString from '../utils/generateQueryString'

class PostService extends Service {

    static getAllPosts (search: Post.Query) {

        const queryString = generateQueryString(search)

        return this.Http
            .get<Post.Paginated>('/posts'.concat(queryString))
            .then(this.getData)
    }

    static getExistingPost (id: number) {
        return this.Http
            .get<Post.Detailed>(`/posts/${id}`)
            .then(this.getData)
    }
    
    static createPost (post: Post.Input) {
        return this.Http
            .post<Post.Detailed>(`/posts`, post)
            .then(this.getData)
    }
    
    static publish(postId: number) {
        return this.Http
            .put<{}>(`/posts/${postId}/publishing`)
            .then(this.getData)
    }

    static unpublish(postId: number) {
        return this.Http
            .delete<{}>(`/posts/${postId}/publishing`)
            .then(this.getData)
    }
    
    static updatePost (postId: number, post: Post.Input) {
        return this.Http
            .put<Post.Detailed>(`/posts/${postId}`, post)
            .then(this.getData)
    }    

}

export default PostService