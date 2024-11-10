"use client";
import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  disabled?: boolean;
  submit: (e: React.FormEvent, comment: string) => void;
};

const CreateComment = (props: Props) => {
  const [commentActive, setCommentActive] = useState(false);
  const [comment, setComment] = useState("");
  const [mobileCommentActive, setMobileCommentActive] = useState(false);

  return (
    <div>
      {!commentActive && (
        <Button
          variant="outline"
          className="border-success text-success hover:border-green300 hover:text-green300 mb-10 hidden sm:block"
          onClick={() => setCommentActive(true)}
          disabled={props.disabled}
        >
          Add Comments
        </Button>
      )}
      {commentActive && (
        <div className="mb-10 hidden sm:block">
          <Textarea
            className="h-36"
            placeholder="What's on your mind..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex gap-2.5 justify-end my-2.5">
            <Button
              variant={"outline"}
              className="border-success text-success hover:text-green300 w-24"
              onClick={() => {
                setCommentActive(false);
                setComment("");
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-success hover:bg-green300 w-24"
              onClick={async (e) => {
                props.submit(e, comment);
                setCommentActive(false);
                setComment("");
              }}
            >
              Post
            </Button>
          </div>
        </div>
      )}

      {/* Mobile */}
      <div className="sm:hidden">
        <Dialog open={mobileCommentActive}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-success text-success hover:border-green300 hover:text-green300 mb-10"
              onClick={() => setMobileCommentActive(true)}
            >
              Add Comments
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-w-[400px] w-full">
            <DialogHeader>
              <DialogTitle className="text-2xl text-start">
                Add Comments
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <Textarea
              className="h-36"
              placeholder="What's on your mind..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <DialogFooter className="flex gap-2.5 flex-col sm:flex-row">
              <DialogClose asChild>
                <Button
                  variant={"outline"}
                  className="border-success text-success hover:text-green300 w-full sm:w-24"
                  onClick={() => {
                    setMobileCommentActive(false);
                    setComment("");
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-success hover:bg-green300 w-full sm:w-24"
                onClick={(e) => {
                  props.submit(e, comment);
                  setMobileCommentActive(false);
                  setComment("");
                }}
              >
                Post
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateComment;
