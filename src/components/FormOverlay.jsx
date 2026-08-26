"use client";
import { useEffect, useState } from "react"; // Kept for potential future use, though not needed in active code
import {
  PackageInfo,
  TrainInfo,
  TransportInfo,
  VisaInfo,
  FileUploads,
  FlightInfo,
  HotelInfo,
  InsuranceInfo,
  PassportInfo,
  PersonalInfo,
  Preview,
} from "@/components/forms";
import Stepper, { Step } from "@/components/ui/Stepper";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setModalForm } from "@/redux/uiSlice";
import PassportChecklist from "@/components/forms/docschecklist/PassportChecklist";
import FlightChecklist from "@/components/forms/docschecklist/FlightChecklist";
import TrainChecklist from "@/components/forms/docschecklist/TrainChecklist";
import HotelChecklist from "@/components/forms/docschecklist/HotelChecklist";

const FormOverlay = () => {
  const dispatch = useDispatch();
  const { modalForm } = useSelector((state) => state.ui);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState([]);

  const allTabs = {
    personalInfo: {
      title: "Personal Information",
      value: "personalinfo",
      content: <PersonalInfo data={formData} setData={setFormData} />,
    },
    flight: {
      title: "Flight Details",
      value: "flightinfo",
      content: <FlightInfo data={formData} setData={setFormData} />,
    },
    hotel: {
      title: "Hotel Details",
      value: "hotelinfo",
      content: <HotelInfo data={formData} setData={setFormData} />,
    },
    insurance: {
      title: "Insurance Info",
      value: "insuranceinfo",
      content: <InsuranceInfo data={formData} setData={setFormData} />,
    },
    passport: {
      title: "Passport Details",
      value: "passportinfo",
      content: <PassportInfo data={formData} setData={setFormData} />,
    },
    package: {
      title: "Package Details", // Made consistent with proper case
      value: "packageinfo",
      content: <PackageInfo data={formData} setData={setFormData} />,
    },
    train: {
      title: "Train Details", // Made consistent with proper case
      value: "traininfo",
      content: <TrainInfo data={formData} setData={setFormData} />,
    },
    visa: {
      title: "Visa Details", // Made consistent with proper case
      content: <VisaInfo data={formData} setData={setFormData} />,
      value: "visainfo",
    },
    transport: {
      title: "Transport Details", // Made consistent with proper case
      value: "transportinfo",
      content: <TransportInfo data={formData} setData={setFormData} />,
    },
    fileupload: {
      title: "Upload Documents",
      value: "fileupload",
      content: (
        <FileUploads
          data={{ formData, files }}
          setData={(newData) => {
            setFormData(newData.formData);
            setFiles(newData.files);
          }}
        />
      ),
    },
    flightChecklist: {
      title: "Required Documents",
      value: "requiredDocs",
      content: <FlightChecklist />,
    },
    hotelChecklist: {
      title: "Required Documents",
      value: "requiredDocs",
      content: <HotelChecklist />,
    },
    passportChecklist: {
      title: "Required Documents",
      value: "requiredDocs",
      content: <PassportChecklist />,
    },
    trainChecklist: {
      title: "Required Documents",
      value: "requiredDocs",
      content: <TrainChecklist />,
    },
    preview: {
      title: "Final Review",
      value: "preview",
      content: (
        <Preview
          data={{ formData, files }}
          setData={(updatedData) => {
            setFormData(updatedData.formData);
            setFiles(updatedData.files);
          }}
        />
      ),
    },
  };

  // Default Tabs
  let tabs = [];

  // Add a package-specific tab if modalForm is set
  if (modalForm && allTabs[modalForm]) {
    const isTransport = modalForm === "flight" || modalForm === "train";

    if (isTransport) {
      tabs.push(allTabs[modalForm], allTabs["personalInfo"]);
    } else {
      tabs.push(allTabs["personalInfo"], allTabs[modalForm]);
    }

    const checklistTab = allTabs[`${modalForm}Checklist`];
    const fileUploadTab = allTabs["fileupload"];

    if (modalForm === "visa") {
      tabs.push(fileUploadTab);
    }

    if (checklistTab) {
      tabs.splice(2, 0, checklistTab);
      tabs.splice(3, 0, fileUploadTab);
    }

    tabs.push(allTabs["preview"]);
  }

  const handleSubmit = async () => {
    dispatch(setModalForm(null));
    toast.info("Submitting your request...");
    try {
      const typeOfForm = modalForm;
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      files.forEach((file) => formDataToSend.append("documents", file));
      
      const { submitEnquiry } = await import("@/lib/actions/enquiry.js");
      const result = await submitEnquiry(typeOfForm, formDataToSend);
      
      if (result.success) {
        toast.success("Success! Request submitted.");
        // Clear local storage on success
        localStorage.removeItem("formData");
        localStorage.removeItem("files");
      } else {
        toast.warning(result.error || "Oops! Something went wrong.");
      }
    } catch (error) {
      toast.warning("Oops! Something went wrong.");
      console.error(error);
    }
  };

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    const savedFiles = localStorage.getItem("files");
    if (savedFormData) {
      // eslint-disable-next-line
      setFormData(JSON.parse(savedFormData));
    }
    if (savedFiles) {
       
      setFiles(JSON.parse(savedFiles));
    }
  }, []);

  // ⬇️ Save formData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // ⬇️ Save files to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("files", JSON.stringify(files));
  }, [files]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Stepper
        initialStep={1}
        onFinalStepCompleted={handleSubmit}
        backButtonText="Previous"
        nextButtonText="Next"
        stepCircleContainerClassName="bg-black overflow-y-scroll no-scrollbar max-h-[90vh]"
      >
        {tabs.map((tab) => (
          <Step key={tab.value}>{tab.content}</Step> // Use value as key for uniqueness
        ))}
      </Stepper>
    </div>
  );
};

export default FormOverlay;
