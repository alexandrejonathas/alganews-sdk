import { User } from "../@types";
import Service from "../Service";

class UserService extends Service {

    static getAllEditors () {
        return this.Http
            .get<User.EditorSummary[]>('/users/editors')
            .then(this.getData)
    }
    
    static getExistingEditor (id: number) {
        return this.Http
            .get<User.EditorDetailed>(`/users/editors/${id}`)
            .then(this.getData)
    }
    
    static getDetailedUser (userId: number) {
        return this.Http
            .get<User.Detailed>(`/users/${userId}`)
            .then(this.getData)
    }
   
    static getAllUsers () {
        return this.Http.get<User.Summary[]>('/users').then(this.getData);
    }
    
    static updateUser (userId: number, userData: User.Input) {
        return this.Http.put<User.Detailed>(`/users/${userId}`, userData).then(this.getData);
    }

    static createUser (userData: User.Input) {
        return this.Http.post<User.Detailed>('/users', userData).then(this.getData);
    }

    static activateUser(userId: number) {
        return this.Http.put<{}>(`/users/${userId}/activation`).then(this.getData);
    }

    static deactivateUser(userId: number) {
        return this.Http.delete<{}>(`/users/${userId}/activation`).then(this.getData);
    }
}

export default UserService