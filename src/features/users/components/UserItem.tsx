import { Link } from "react-router-dom";

const UserItem: React.FC<{
  id: string;
  name: string;
  placeCount: number;
  imageUrl: string;
}> = ({ id, name, placeCount, imageUrl }) => {
  return (
    <Link to={`/${id}/places`}>
      <section className=" bg-black w-80 h-fit text-white flex items-center rounded shadow-md ">
        <section className=" m-3 w-16 h-16 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={imageUrl}
            alt={`${name}'s profile picture`}
          />
        </section>
        <section>
          <h1 className="text-xl text-yellow-500">{name}</h1>
          <p className="font-bold">
            {placeCount} {placeCount === 1 ? "place" : "places"}
          </p>
        </section>
      </section>
    </Link>
  );
};

export default UserItem;
