import { createLazyFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/OurComponent/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getTopicsByUser,
  getMahasiswaByTopic,
  getAttendanceDetails,
} from "@/service/absensi";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Protected } from "@/components/OurComponent/AuthMiddleware";

export const Route = createLazyFileRoute("/absensi/")({
  component: () => (
    <Protected roles={["dosen"]}>
      <AbsensiMahasiswa />
    </Protected>
  ),
});

function AbsensiMahasiswa() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [showAttendance, setShowAttendance] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const scrollContainerRef = useRef(null);

  // Queries for fetching topics and students
  const {
    data: topics = [],
    isLoading: isTopicsLoading,
    error: topicsError,
  } = useQuery({
    queryKey: ["topicsData"],
    queryFn: getTopicsByUser,
    select: (data) =>
      data.map((topic) => ({
        ...topic,
        active: topic.nama.toLowerCase() === search.topic?.toLowerCase(),
      })),
  });

  const {
    data: students = [],
    isLoading: isStudentsLoading,
    error: studentsError,
  } = useQuery({
    queryKey: ["students", search.topic],
    queryFn: () => {
      const selectedTopic = topics.find(
        (t) => t.nama.toLowerCase() === search.topic?.toLowerCase(),
      );
      return selectedTopic
        ? getMahasiswaByTopic(selectedTopic.nama)
        : Promise.resolve([]);
    },
    enabled: !!search.topic && topics.length > 0,
  });

  // Query for fetching attendance details
  const {
    data: attendanceDetails = [],
    isLoading: isAttendanceLoading,
    isError: isAttendanceError,
  } = useQuery({
    queryKey: ["attendance", selectedStudent?.user_id],
    queryFn: () => getAttendanceDetails(selectedStudent?.user_id),
    enabled: !!selectedStudent?.user_id && showAttendance,
  });

  const updateUrlStudent = (selectedStudent) => {
    navigate({
      search: (prev) => ({
        ...prev,
      }),
    });
  };

  const updateUrl = (topicName) => {
    navigate({
      search: (prev) => ({
        ...prev,
        topic: topicName.toLowerCase(),
      }),
    });
  };

  const AttendanceStatus = ({ label, count, color }) => (
    <div className="text-center">
      <div
        className={`w-16 h-16 ${color} text-white rounded-lg flex items-center justify-center text-xl font-semibold`}
      >
        {count || 0}
      </div>
      <p className="text-sm mt-1">{label}</p>
    </div>
  );

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleTopicClick = (topic) => {
    updateUrl(topic.nama);
  };

  const handleStudentClick = (student) => {
    updateUrlStudent(student);
    setSelectedStudent(student);
    setShowAttendance(true);
  };

  if (isTopicsLoading) {
    return (
      <Card className="border flex justify-center shadow-sm">
        <CardContent className="p-8 px-40 justify-center flex">
          <div className="animate-pulse text-gray-500">Loading topics...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Navbar isAuth={true} />
      <div className="w-full max-w-6xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold mt-[4vh] mb-[1vh]">Absensi</h1>

        <Card className="border shadow-sm">
          <CardContent className="p-8 px-2 relative">
            <div
              className="flex space-x-2 justify-center px-24"
              ref={scrollContainerRef}
            >
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicClick(topic)}
                  className={`px-4 py-6 rounded-xl font-bold transition-colors ${
                    topic.active
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-400"
                  }`}
                >
                  {topic.nama}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleScroll("left")}
              className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white shadow-md rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white shadow-md rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </CardContent>
        </Card>

        {!isStudentsLoading && students.length > 0 ? (
          <div className="space-y-4">
            {students.map((student) => (
              <Card key={student.id} className="border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleStudentClick(student)}
                    >
                      <h3 className="font-semibold text-lg">{student.nama}</h3>
                      <p className="text-gray-500 text-sm">{student.nim}</p>
                    </div>
                    <div className="flex space-x-3 items-center">
                      <AttendanceStatus
                        label="Alfa"
                        color="bg-red-500"
                        count={student.alfa}
                      />
                      <AttendanceStatus
                        label="Telat"
                        count={student.telat}
                        color="bg-yellow-500"
                      />
                      <AttendanceStatus
                        label="Hadir"
                        count={student.hadir}
                        color="bg-blue-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border shadow-sm">
            <CardContent className="p-8 px-40 justify-center flex">
              <div className="text-gray-500">No students found</div>
            </CardContent>
          </Card>
        )
        }

        <Dialog open={showAttendance} onOpenChange={setShowAttendance}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedStudent?.nama}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {attendanceDetails.map((record) => {
                const date = new Date(record?.uploadAt);
                return (
                  <div
                    key={record.logbookId}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <p className="font-medium">
                      {date.toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    {record.absensi ? (
                      <div
                        className={
                          "px-4 py-2 rounded-lg bg-blue-500 text-white"
                        }
                      >
                        Hadir
                      </div>
                    ) : (
                      <div
                        className={
                          "px-4 py-2 rounded-lg bg-yellow-500 text-white"
                        }
                      >
                        Telat
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
