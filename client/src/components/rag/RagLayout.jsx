import UploadPanel from "./UploadPanel";
import ChatPanel from "./ChatPanel";

export default function RagLayout() {
  return (
    // ✅ FULL SCREEN HEIGHT (minus navbar if needed)
    <div className="h-[calc(100vh-72px)] overflow-hidden">

      <div className="h-full grid grid-cols-1 md:grid-cols-2">

        {/* Upload Section */}
        <div className="md:h-[80vh] h-full border-b md:border-b-0 md:border-r overflow-hidden">
          <UploadPanel />
        </div>

        {/* Chat Section */}
        <div className="md:h-[80vh] h-full overflow-hidden">
          <ChatPanel />
        </div>

      </div>

    </div>
  );
}