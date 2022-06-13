import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Axios from "axios";
import ReactStars from "react-stars";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Home(props) {
  const songs = props.data;
  const artists = props.arts;

  const ratingChanges = async (event, id) => {
    console.log(event, id);
    try {
      const res = await Axios.patch(`http://localhost:8000/songs/${id}/${event}`);
      return res;
    } catch (err) {
      console.log({ message: err });
    }
  };

  return (
    <div>
      <Head>
        <title>Deltify | Home</title>
        <meta name="description" content="Created by Sairam Aayachya" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <Navbar />
      </nav>
      <main className="flex flex-col">
        {/* Top 10 Songs  */}
        <div className="px-10">
          <div>
            <div className="text-xl font-bold p-3">
              <span>Top 10 Songs</span>
            </div>

            <div className="border-b-2 border-dark-700 py-1">
              <div className="grid grid-cols-4 gap-4">
                <div className="text-md">#</div>
                <div className="text-md">Title</div>
                <div className="text-md">Released date</div>
                <div className="text-md">Rate</div>
                <div className="text-md">Calculated Average</div>
              </div>
            </div>
            <div className="">
              {songs
                .sort((a, b) =>
                  parseFloat(a.avr) > parseFloat(b.avr) ? -1 : 1
                )
                .slice(0, 10)
                .map((song, index) => (
                  <div key={song._id} className="grid grid-cols-4 gap-4">
                    <h4 className="flex items-center">{index + 1}</h4>
                    <div className="flex">
                      <img
                        className="p-2 -ml-2"
                        src={String(song.cover)}
                        width="75px"
                        height="75px"
                        alt="song cover photo"
                      ></img>
                      <div className="flex items-center">
                        <span className="pl-2 grid items-center">
                          <div className="text-md font-bold">{song.name}</div>
                          <span className="text-sm">
                            {song.artist.length > 1
                              ? song.artist.map((item, index) => [
                                  index > 0 && <span>,&nbsp;</span>,
                                  <span>{item.name}</span>,
                                ])
                              : song.artist.map((artst) => (
                                  <span>{artst.name}</span>
                                ))}
                          </span>
                        </span>
                      </div>
                    </div>
                    <h4 className="flex items-center">
                      {song.dateOfRelease.slice(0, 10)}
                    </h4>
                    <ReactStars
                      className="flex items-center"
                      count={5}
                      size={32}
                      half={false}
                      onChange={(event) => ratingChanges(event, song._id)}
                      color2={"#ffd700"}
                    />
                    <h4 className="flex items-center">{(song.avr).slice(0,4)}</h4>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* Top 10 Artists */}
        <div className="px-10 mt-8">
          <div>
            <div className="text-xl font-bold p-3">
              <span>Top 10 Artists</span>
            </div>
            <div className="border-b-2 border-dark-700 py-1">
              <div className="grid grid-cols-artists gap-4">
                <div className="text-md">#</div>
                <div className="text-md">Artist</div>
                <div className="text-md">date of birth</div>
                <div className="text-md">songs</div>
                <div className="text-md">Avg rating (all songs)</div>
              </div>
            </div>
            <div>
              {artists
                .sort((a, b) =>
                  parseFloat(a.avsr) > parseFloat(b.avsr) ? -1 : 1
                )
                .slice(0, 10)
                .map((artist, index) => (
                  <div
                    key={artist._id}
                    className="grid grid-cols-artists gap-4 py-1"
                  >
                    <h4 className="flex items-center">{index + 1}</h4>
                    <div className="flex items-center">
                      <div className="text-md font-bold">{artist.name}</div>
                    </div>
                    <h4 className="flex items-center">
                      {artist.dateOfBirth.slice(0, 10)}
                    </h4>
                    <div className="flex items-center">
                      <span className="text-sm">
                        {artist.songs.length > 1
                          ? artist.songs.map((item, index) => [
                              index > 0 && <span>,&nbsp;</span>,
                              <span>{item.name}</span>,
                            ])
                          : artist.songs.map((sng) => <span>{sng.name}</span>)}
                      </span>
                    </div>
                    <h4 className="flex items-center">
                      {(artist.avsr).slice(0,4)}
                    </h4>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="/" target="_blank" rel="noopener noreferrer">
          by
          <span className="text-lg font-bold text-green-500">
            &nbsp;Sairam Ayachya
          </span>
        </a>
      </footer>
    </div>
  );
}


export const getStaticProps = async () => {
  const res = await Axios.get("http://localhost:8000/songs/");
  const artists = await Axios.get("http://localhost:8000/artists");

  return {
    props: {
      data: res.data,
      arts: artists.data,
    },
  };
};
