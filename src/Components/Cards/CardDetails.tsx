import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import SimilarCards from "./SimilarCards";
import axios from "axios";
const SERVER_URL =import.meta.env.REACT_APP_SERVER_BASE_URL;
interface CardDetailsType {
  _id: string;
  name: string;
  image: string;
  category: string;
  cashback: string;
  price: number;
  amounts: number[];
  discountedPrice: number;
  validityMonths: number;
}

const CardDetails = () => {
  const { id } = useParams();
  const [card, setCard] = useState<CardDetailsType | null>(null);
  const [,setSimilarCards] = useState<CardDetailsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | string>("");
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  // const apiUrl = import.meta.env.VITE_API_URL;
  const handleAmountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAmount(event.target.value);
  };

  const fetchCard = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/cards/${id}`);
      setCard(response.data);
      fetchSimilarCards(response.data.category);
    } catch (err) {
      setError((err as Error).message || "Failed to fetch card details");
    }
     finally { 
      setLoading(false);
    }
  };

  const fetchSimilarCards = async (category: string) => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/cards/category/${category}`);
      const filteredCards = response.data.filter((c: CardDetailsType) => c._id !== id);
      setSimilarCards(filteredCards);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to fetch similar products:", err.message);
      } else {
        console.error("Failed to fetch similar products");
      }
    }
    
  };

  useEffect(() => {
    if (!id) {
      setError("Invalid card ID");
      setLoading(false);
      return;
    }
    fetchCard();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!card) return <p className="text-center text-gray-500 mt-10">No card found.</p>;

  const discountedAmount = (Number(selectedAmount) * (100 - Number(card.cashback))) / 100;

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 flex flex-wrap items-center gap-1 mb-6">
        <Link to="/" className="text-orange-500 hover:underline">Home</Link>
        <span>&gt;</span>
        <span className="font-semibold text-gray-700">{card.name} Gift Card</span>
      </div>

      {/* Card Details */}
      <div className="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="space-y-4">
          <img
            src={`${SERVER_URL}/uploads/${card.image}`}
            alt={card.name}
            className="w-full h-64 object-contain rounded-lg border"
          />
          <div className="text-sm text-gray-600 space-y-1 text-center lg:text-left">
            <p>Vendor: <span className="font-medium">xmretail</span></p>
            <p>Valid for up to <span className="font-medium">{card.validityMonths} months</span></p>
          </div>
          <div className="flex justify-center lg:justify-start gap-4">
            <button
              onClick={() => setShowRedeemModal(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600"
            >
              How To Redeem
            </button>
            <button
              onClick={() => setShowNotesModal(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600"
            >
              Points to Note
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6 text-center lg:text-right">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{card.name}</h2>
            <p className="text-red-500 text-xl font-bold mt-1">{card.cashback}% Off</p>
            <p className="text-3xl font-bold text-gray-700 mt-2">₹ {card.price}</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700">Select Amount:</h3>
            <select
              value={selectedAmount}
              onChange={handleAmountChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="" disabled>Select an amount</option>
              {card.amounts.map((amount, index) => (
                <option key={index} value={amount}>₹{amount}</option>
              ))}
            </select>
          </div>

          {selectedAmount && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-600">You pay only</p>
              <p className="text-2xl font-bold text-gray-800">₹ {discountedAmount.toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>

     

      {/* Redeem Modal */}
      {showRedeemModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg space-y-4">
            <h2 className="text-xl font-bold">How To Redeem</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
              <li>Log on to the retailer's app or website.</li>
              <li>Add items to the cart and proceed to checkout.</li>
              <li>Enter the gift card code during payment and apply.</li>
              <li>Pay the remaining balance if any.</li>
            </ul>
            <button
              onClick={() => setShowRedeemModal(false)}
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg space-y-4">
            <h2 className="text-xl font-bold">Points to Note</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
              <li>Gift cards are non-refundable and cannot be exchanged for cash.</li>
              <li>Ensure the gift card is redeemed before the expiry date.</li>
              <li>Only one gift card can be used per transaction unless stated otherwise.</li>
              <li>Contact customer support for any redemption issues.</li>
            </ul>
            <button
              onClick={() => setShowNotesModal(false)}
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
       <SimilarCards category={card.category} currentCardId={card._id} />
    </div>
  );
};

export default CardDetails;
