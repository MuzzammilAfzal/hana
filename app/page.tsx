import Image from "next/image";
import Video from "../components/video";
import OrderForm from "@/components/orderForm";
import EnquiryForm from "@/components/enquiryForm";
import GoToAdminButton from "@/components/GoToAdminButton";


export default function Home() {
  return (
    <main>
      <Video/>
      <OrderForm />
      <EnquiryForm />
      <GoToAdminButton />
    </main>
  );
}
