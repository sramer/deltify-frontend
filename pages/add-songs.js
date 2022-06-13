import { useEffect, useState } from "react";
import Select from "react-select";
import Axios from "axios";
import Navbar from "../components/Navbar";
import Image from "next/dist/client/image";
import AWS from "aws-sdk";
import { useRouter } from 'next/router';



AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: process.env.NEXT_PUBLIC_S3_BUCKET },
  region: process.env.NEXT_PUBLIC_REGION,
});

export default function addSong(props) {
  const artists = props.artists;
  const router = useRouter();

  const options = [];
  artists.map((artist) => {
    const person = {};
    person.value = artist._id;
    person.label = artist.name;
    options.push(person);
  });
  const [select, selectedOption] = useState(null);
  const [progress, setProgress] = useState(0);
  const [songName, setSongName] = useState("");
  const [artistID, setArtistID] = useState([]);
  const [songDate, setSongDate] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [artistName, setArtistName] = useState("");
  const [birthDate, setbirthDate] = useState("");
  const [bio, setBio] = useState("");

  const handleChange = (item) => {
    selectedOption(item);
    const artist = item.map((artst) => artst.value);
    setArtistID(artist);
  };

  const handelImageUpload = async (e) => {
    const imageUpload = e.target.files[0];
    const imageName = imageUpload.name.replace(" ", "+");
    const image = `https://deltify-images.s3.ap-south-1.amazonaws.com/${imageName}`;
    setImageURL(image);

    const params = {
      ACL: "public-read",
      Body: imageUpload,
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
      Key: imageUpload.name,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  const handleSubmit = async (e) => {
    console.log(songName, songDate, imageURL, artistID);
    try {
      const res = await Axios.post("http://localhost:8000/songs", {
        name: songName,
        artist: artistID,
        dateOfRelease: songDate,
        cover: imageURL,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleArtistSubmit = async (e) => {
    e.preventDefault()
    console.log(artistName, birthDate, bio)
    try {
      const res = await Axios.post("http://localhost:8000/artists", {
        name: artistName,
        dateOfBirth: birthDate,
        bio: bio
      });
      router.replace(router.asPath);
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
    setShowModal(false)
  }

  return (
    <div className="">
      <nav>
        <Navbar />
      </nav>
      <div className="">
        <form action="/" onSubmit={handleSubmit}>
          <div className="text-center p-2 text-2xl font-bold">
            <span>Add new song</span>
          </div>
          <div className="block m-auto shadow sm:rounded-md w-1/2">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6 rounded-xl">
              <div className="">
                <label
                  htmlFor="company-website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Song name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="company-website"
                    id="company-website"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder="Light Switch"
                    onChange={(e) => setSongName(e.target.value)}
                    value={songName}
                  />
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="company-website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Release date
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="date"
                    onChange={(e) => setSongDate(e.target.value)}
                    value={songDate}
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="company-website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Artists
                </label>
                <div className="flex items-center">
                  <Select
                    className="w-full p-0 bg-transparent rounded-md"
                    isMulti={true}
                    value={select}
                    onChange={handleChange}
                    options={options}
                    placeholder={"Select the artists"}
                  />
                  <span className="inline-flex items-center px-3 rounded-l-md text-gray-500 text-sm">
                    <button
                      className="bg-green-500 text-white active:bg-pink-600 font-bold uppercase text-xs whitespace-nowrap px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ml-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(true)}
                    >
                      + Add Artist
                    </button>
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cover photo
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handelImageUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </div>
              <div className="text-sm">
                {progress === 100 ? <span>Image Uploaded</span> : <span></span>}
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-3 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <form onSubmit={handleArtistSubmit}>
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Add Artist</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative w-3xl p-6 flex-auto">
                      <div className="">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Artist name
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="company-website"
                            id="company-website"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                            placeholder="Bruno Mars"
                            onChange={(e) => setArtistName(e.target.value)}
                            value={artistName}
                          />
                        </div>
                      </div>
                      <div className="">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Release date
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="date"
                            onChange={(e) => setbirthDate(e.target.value)}
                            value={birthDate}
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium text-gray-700"
                        >
                          About
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="enter some info"
                            defaultValue={""}
                            onChange={(e) => setBio(e.target.value)}
                            value={bio}
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Brief description about artist.
                        </p>
                      </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      // onClick={() => setShowModal(false)}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
                </form>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await Axios.get("http://localhost:8000/artists/");

  return {
    props: {
      artists: res.data
    },
  };
};


