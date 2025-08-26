"use client";
import React, { useState, useRef } from "react";
import { Play } from "lucide-react";

interface VideoItem {
  id: number;
  title: string;
  description: string;
  src: string;
}

const videos: VideoItem[] = [
  {
    id: 1,
    title: "Register User",
    description:
      "This video explains the user registration process, from filling out details to accessing personalized features in the system.",
    src: "/Yantram-User-SRecording.mp4",
  },
  {
    id: 2,
    title: "Frenchies Manager Login",
    description:
      "Learn how Frenchies managers can securely log in, manage branches, and access their dedicated tools with ease.",
    src: "/Yantram-Manager-SRecording.mp4",
  },
  {
    id: 3,
    title: "Admin Login",
    description:
      "A step-by-step walkthrough of the admin login process, showcasing the dashboard and management tools available for administrators.",
    src: "/Yantram-Admin-SRecording.mp4",
  },
];

const AboutInfoVideo = () => {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(videos[0]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoChange = (video: VideoItem) => {
    setActiveVideo(video);
    if (videoRef.current) {
      videoRef.current.load(); // reset video
      videoRef.current.play(); // autoplay new video
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Our Informative Videos
        </h2>

        {/* Main Video Player */}
        <div className="mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <video
              ref={videoRef}
              key={activeVideo.id}
              controls
              className="w-full h-[420px] object-cover rounded-2xl"
              src={activeVideo.src}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white">
              <h3 className="text-xl font-semibold">{activeVideo.title}</h3>
              <p className="text-sm opacity-80">{activeVideo.description}</p>
            </div>
          </div>
        </div>

        {/* Video Playlist */}
        <div className="grid md:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => handleVideoChange(video)}
              className={`cursor-pointer group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border ${
                activeVideo.id === video.id
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            >
              <div className="relative">
                <video
                  muted
                  className="w-full h-40 object-cover"
                  src={video.src}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                  <Play className="w-12 h-12 text-white bg-black/60 rounded-full p-2" />
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 group-hover:text-blue-600">
                  {video.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutInfoVideo;
