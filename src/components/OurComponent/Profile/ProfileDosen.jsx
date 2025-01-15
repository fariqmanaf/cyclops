import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";

const DataProfileDosen = () => {
  const userName = useSelector((state) => state.auth?.user?.name);

  return (
    <div>
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarFallback className="bg-blue-500 text-white text-xl">
                {userName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-bold">{userName}</h2>
            <p className="text-gray-500">Dosen</p>
            <p className="text-gray-500">Universitas Jember</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataProfileDosen;
