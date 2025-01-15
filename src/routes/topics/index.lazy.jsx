import Navbar from "@/components/OurComponent/Navbar";
import { createLazyFileRoute } from "@tanstack/react-router";
import { CardTopics } from "@/components/OurComponent/CardTopics";
import { motion } from "motion/react";
import { Protected } from "@/components/OurComponent/AuthMiddleware";
import { useQuery } from "@tanstack/react-query";
import { getAllTopics } from "@/service/topics";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import toast from "react-hot-toast";

export const Route = createLazyFileRoute("/topics/")({
  component: () => (
    <Protected roles={["mahasiswa"]}>
      <TopicsComponent />
    </Protected>
  ),
});

function TopicsComponent() {
  const [topicsData, setTopicsData] = useState([]);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["topics"],
    queryFn: () => getAllTopics(),
  });

  useEffect(() => {
    if (isSuccess) {
      setTopicsData(data);
    } else if (isError) {
      toast.error("Anda Belum Melengkapi Dokumen");
    }
  }, [isSuccess, isError, data]);

  return (
    <>
      <Navbar isAuth={true} />
      <div className="w-screen h-[90vh] flex flex-col pt-20 md:px-32 px-16">
        <p className="text-2xl font-semibold mb-10">Topik Capstone</p>
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
            {topicsData?.map((topic) => (
              <CardTopics key={topic.id} data={topic} />
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
}
