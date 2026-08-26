"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import axios from "axios";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/admin/forms/Modal";
import Loader from "@/components/common/Loader";

const Manage = () => {
  const { name } = useParams();
  const [modal, setModal] = useState(null);
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const handleAdd = async (data) => {
    try {
      const respose = await axios.post(`/api/${name}/add`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchData();
      toast.success(`Saved! added successfully.`);
      return respose.data;
    } catch (error) {
      toast.warning(error.response.data.error || "Oops! Something went wrong.");
      console.error(error);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const response = await axios.put(`/api/${name}/update/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchData();
      toast.info(`Updated! ${id} updated successfully.`);
      return response.data;
    } catch (error) {
      toast.warning(error.response.data.error || "Oops! Something went wrong.");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm("Are you sure?");
      if (!confirm) return;
      await axios.delete(`/api/${name}/delete/${id}`);
      fetchData();
      toast.warn(`Deleted! ${id} deleted successfully.`);
    } catch (error) {
      toast.warning(error.response.data.error || "Oops! Something went wrong.");
      console.error(error);
    }
  };

  const handleSend = async (id) => {
    try {
      const confirm = window.confirm("Are you sure?");
      if (!confirm) return;
      await axios.post(`/api/${name}/send/${id}`);
      fetchData();
      toast.info(`Sent! Mail sent to all subscribers.`);
    } catch (error) {
      toast.warning(error.response.data.error || "Oops! Something went wrong.");
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/${name}`);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchData = () => {
    if (!search) {
      setFilteredData(data); // If search is empty, show all
      return;
    }

    const searchableFields = ["_id", "title"]; // add more fields if needed

    const response = data?.filter((item) =>
      searchableFields.some((field) =>
        item[field]?.toString().toLowerCase().includes(search.toLowerCase())
      )
    );

    setFilteredData(response);
  };

  useEffect(() => {
    searchData();
  }, [data, search]);

  useEffect(() => {
    fetchData();
  }, [name]);

  if (!data) {
    return <Loader />;
  }

  return (
    <div className="py-20 px-4 lg:px-10 min-h-screen">
      <div className="flex justify-between items-center w-full">
        <h1 className="my-4 text-xl md:text-3xl lg:text-4xl">
          Manage {`${name} (${data.length})`}
        </h1>
        <div className="flex justify-center items-center gap-2 ">
          <Input
            placeholder={"Search"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div
            onClick={() =>
              setModal({
                item: {},
                formType: name,
                action: "add",
              })
            }
            className="p-1 rounded-md hover:bg-neutral-50/20 cursor-pointer"
          >
            <Plus size={20} />
          </div>
        </div>
      </div>
      <div className="my-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {filteredData?.map((item) => (
          <div
            key={item._id}
            className="border p-2 md:p-4 max-w-sm h-50 flex flex-col justify-between rounded-sm bg-neutral-950 hover:bg-neutral-900"
          >
            <h1 className="text-base md:text-xl lg:text-2xl">
              {item.title ||
                item.name ||
                item.subject ||
                item.planName ||
                "Unnamed"}
            </h1>
            {item?.type && (
              <h1 className="text-base md:text-xl lg:text-2xl">{item.type}</h1>
            )}
            <div className="flex gap-2 items-center justify-end">
              <Button
                onClick={() =>
                  setModal({
                    item,
                    formType: name,
                    action: "update",
                  })
                }
                variant="outline"
              >
                Update
              </Button>
              <Button onClick={() => handleDelete(item._id)}>Delete</Button>
              {name === "newsletter" && (
                <Button onClick={() => handleSend(item._id)}>Send</Button>
              )}
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <Modal
          modal={modal}
          setModal={setModal}
          handleAdd={handleAdd}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Manage;
