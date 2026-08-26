import { XCircle } from "lucide-react";
import HotelForm from "@/components/admin/forms/HotelForm";
import CarouselForm from "@/components/admin/forms/CarouselForm";
import PackageForm from "@/components/admin/forms/PackageForm";
import DestinationForm from "@/components/admin/forms/DestinationForm";
import TestimonialForm from "@/components/admin/forms/TestimonialForm";
import NewsletterForm from "@/components/admin/forms/NewsletterForm";
import BlogForm from "@/components/admin/forms/blogForm";
import DayTripsForm from "@/components/admin/forms/DayTripsForm";

const formComponents = {
  newsletter: NewsletterForm,
  hotel: HotelForm,
  carousel: CarouselForm,
  package: PackageForm,
  destination: DestinationForm,
  testimonial: TestimonialForm,
  dayTrip: DayTripsForm,
  blog: BlogForm,
};

const Modal = ({ modal, setModal, handleAdd, handleUpdate }) => {
  if (!modal?.formType || !modal.item) return null;

  const FormComponent = formComponents[modal.formType]; // e.g., "hotel", "visa"

  return (
    <div className="fixed inset-0 mx-4 bg-black/40 z-50 flex flex-col gap-2 items-center justify-center">
      <XCircle size={40} onClick={() => setModal(null)} />
      <div className="max-w-md h-[70vh] overflow-y-scroll no-scrollbar w-full bg-neutral-900 p-6 rounded-md shadow-lg">
        {FormComponent ? (
          <FormComponent
            data={modal.item}
            setModal={setModal}
            handleAdd={handleAdd}
            handleUpdate={handleUpdate}
            isUpdate={modal.action === "update"}
          />
        ) : (
          <p className="text-white">Form type "{modal.formType}" not found.</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
