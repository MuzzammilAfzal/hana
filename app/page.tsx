import Image from "next/image";
import Video from "../components/video";
import OrderForm from "@/components/orderForm";
import EnquiryForm from "@/components/enquiryForm";



export default function Home() {
  return (
    <main>
      <Video/>
      <OrderForm />
      <EnquiryForm />

    </main>
  );
}
