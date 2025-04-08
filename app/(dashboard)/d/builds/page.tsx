import Btn from "@/components/Btn";
import React from "react";

const BuildsPage = () => {
  return (
    <section className="mt-[4rem] mx-4">
      <div className="flex justify-around">
        <h1 className="text-3xl font-bold text-white mb-4 manrope">
          Builds Page
        </h1>
        <Btn link="/d/builds/new" title="Create New Build" />
      </div>
    </section>
  );
};

export default BuildsPage;
