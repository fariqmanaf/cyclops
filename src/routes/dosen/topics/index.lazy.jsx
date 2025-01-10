import Navbar from "@/components/OurComponent/Navbar";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { CardTopics } from "@/components/OurComponent/CardTopics";
import { motion } from "motion/react";
import { Protected } from "@/components/OurComponent/AuthMiddleware";
import { useQuery } from "@tanstack/react-query";
import { getAllTopics } from "@/service/topics";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

export const Route = createLazyFileRoute("/dosen/topics/")({
  component: () => (
    <Protected roles={["dosen"]}>
      <DosenTopicsComponent />
    </Protected>
  ),
});

function DosenTopicsComponent() {
  const [topicsData, setTopicsData] = useState([]);
  const [deletedTopic, setDeletedTopic] = useState({
    status: false,
    id: "",
  });

  const {
    data: topicData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["topics"],
    queryFn: () => getAllTopics(),
  });

  useEffect(() => {
    if (isSuccess) {
      setTopicsData(topicData);
    } else if (isError) {
      toast.error("Gagal mengambil data topik");
    }
  }, [isSuccess, isError, topicData]);

  useEffect(() => {
    if (deletedTopic.status === true) {
      setTopicsData((prevData) =>
        prevData.filter((topic) => topic.id !== deletedTopic.id),
      );
    }
  }, [deletedTopic]);

  return (
    <>
      <Navbar isAuth={true} />
      <div className="w-screen h-[90vh] flex flex-col pt-20 md:px-32 px-16">
        <div className="flex justify-between">
          <p className="text-2xl font-semibold mb-10">Topik Capstone</p>
          <Link
            to={`/dosen/topics/create`}
            className="p-2 h-10 bg-slate-900 text-white text-center rounded-xl hover:bg-slate-700"
          >
            Tambah Topik
          </Link>
        </div>
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ReactLoading type="spin" color="#273B4A" />
          </div>
        ) : (
          <motion.div
            id="card-topics"
            className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-10 pb-10"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {topicsData.map((topic) => (
              <CardTopics
                key={topic.id}
                data={topic}
                isDosen={true}
                setDeletedTopic={setDeletedTopic}
              />
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
}
