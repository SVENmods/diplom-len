import { useAuth0 } from "@auth0/auth0-react";

const ProfilePage = () => {
     const {user} = useAuth0()

     return (
          <main>
          <h1 className="h1">Мой профиль</h1>
          <span>{user?.given_name}</span>
          <span>{user?.family_name}</span><br />
          <a href="/profile/edit">редактировать</a>
          </main>
     );
}

export default ProfilePage;