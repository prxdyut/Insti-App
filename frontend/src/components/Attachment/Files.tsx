import React, { useEffect, useRef, useState } from "react";
import {
  Block,
  Button,
  Icon,
  List,
  ListItem,
  MessagebarAttachment,
  MessagebarAttachments,
  PhotoBrowser,
} from "framework7-react";
import { format } from "date-fns";
import SwipeableEdgeDrawer from "../Swipeable/EdgeDrawer";

// Define the Props type
type Props = {
  size: "small" | "big";
  className?: string;
  files: _File[];
  tile?: boolean;
};

const AttachmentFiles: React.FC<Props> = (props) => {
  const { className, size, files, tile } = props;
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const photoPopupRef = useRef<{
    el: HTMLElement | null;
    f7PhotoBrowser: () => any;
    open: (args: any) => void;
    close: () => void;
  }>(null);

  // Function to determine if a file is an image
  const isImageFile = (file: _File) =>
    file?.type.startsWith("image/") ||
    file?.type.includes("jpeg") ||
    file?.type.includes("jpg") ||
    file?.type.includes("png");

  // Function to filter image attachments
  const getImageAttachments = () => files.filter(isImageFile);

  // Function to filter non-image attachments
  const getFileAttachments = () => files.filter((file) => !isImageFile(file));

  // Function to open the photo popup
  const openPhotoPopup = (index: number) => () => {
    photoPopupRef.current?.open(index);
    setDrawerOpen(false);
  };

  // Function to handle the button click
  const handleButtonClick = () => {
    setDrawerOpen(true);
  };

  // Effect to handle the browser's back button
  useEffect(() => {
    const handlePopState = () => {
      if (photoPopupRef.current?.f7PhotoBrowser().opened) {
        photoPopupRef.current.close();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Function to render a single tile view if there is exactly one file and the tile prop is true
  const renderSingleTile = () => {
    const file = files[0];
    return (
      <div className="bg-gray-200 p-1 hover:bg-gray-300 rounded">
        <div className="aspect-[4/1] flex items-center justify-center bg-white rounded">
          <Icon
            material={file.icon}
            size={36}
            className="opacity-50 font-semibold"
          />
        </div>
        <div className="px-1 pt-2 pb-1">
          <div className="text-xs">{file.name}</div>
          <div className="font-semibold">{file.title}</div>
          <div className="text-xs">{format(file.date, "dd MMM, yyyy")}</div>
        </div>
      </div>
    );
  };

  // Main render function
  const renderAttachmentFiles = () => (
    <div className={className}>
      <PhotoBrowser
        photos={getImageAttachments()}
        theme="dark"
        type="popup"
        onPhotoBrowserClose={() => setDrawerOpen(true)}
        // @ts-ignore
        ref={photoPopupRef}
      />
      <Button
        outline
        className={`${size === "small" ? "w-min" : ""}`}
        small={size === "small"}
        style={{
          borderColor: "var(--f7-button-text-color, var(--f7-theme-color))",
        }}
        sheetOpen=".demo-sheet-swipe-to-close"
        onClick={handleButtonClick}
      >
        <Icon material="attach_file" size={18} className="rotate-45" /> &nbsp;
        {files.length} Files
      </Button>
      <SwipeableEdgeDrawer
        title={`${files.length} Files`}
        open={isDrawerOpen}
        setOpen={setDrawerOpen}
      >
        <Block className="no-padding max-h-[50vh]" style={{ margin: 0 }}>
          <div className={` ${!getImageAttachments().length && "hidden"}`}>
            <MessagebarAttachments style={{ paddingBottom: "1rem" }}>
              {getImageAttachments().map((file, index) => (
                <MessagebarAttachment
                  key={index}
                  image={file.url}
                  deletable={false}
                  onAttachmentClick={openPhotoPopup(index)}
                />
              ))}
            </MessagebarAttachments>
          </div>
          <List dividersIos mediaList outlineIos strongIos style={{ margin: 0 }}>
            {getFileAttachments().map((file, index) => (
              <ListItem
                key={index}
                link="#"
                footer={format(file.date, "dd MMM, yyyy")}
                header={file.name}
                title={file.title}
                after={file.size}
              >
                <Icon slot="media" material={file.icon} />
              </ListItem>
            ))}
          </List>
        </Block>
      </SwipeableEdgeDrawer>
    </div>
  );

  // Conditional rendering based on tile and file length
  return tile && files.length === 1 ? renderSingleTile() : renderAttachmentFiles();
};

export default AttachmentFiles;
