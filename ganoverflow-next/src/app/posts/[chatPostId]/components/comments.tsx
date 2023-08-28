"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { postComment } from "../../api/chatposts";
import { useRouter } from "next/navigation";
import { parseDate, parseDateWithSeconds } from "@/utils/parseDate";
import { useSignedCheck } from "@/hooks/useSignedCheck";

export function CommentBox({
  chatPostId,
  comments,
}: {
  chatPostId: string;
  comments: TComments;
}) {
  const checkUserSigned = useSignedCheck();

  const router = useRouter();
  const commentCount = comments?.length;
  const [commentData, setCommentData] = useState("");
  const [userDidLike, setUserDidLike] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentData(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async () => {
    if (!checkUserSigned()) return;

    if (commentData === "") {
      alert("댓글을 입력하세요");
      return;
    }

    const res = await postComment({ content: commentData }, chatPostId);
    if (res.status === 201) {
      setCommentData("");
      router.refresh();
    } else {
      console.log("등록 실패: ", res);
    }
  };

  return (
    <>
      <div className="comments-totalcount">{`전체 댓글 ${commentCount}개`}</div>
      <div className="comments-commentbox border border-stone-500">
        {comments?.map((comment, idx) => {
          return (
            <div
              className="flex flex-row gap-2 border-b-2 border-stone-500"
              key={idx}
            >
              <div className="border border-1 rounded-full m-4 w-20">사진</div>
              <div className="flex flex-col w-full ">
                <div className="flex flex-row justify-between">
                  <div className="w-1/3 text-left py-2 flex gap-2">
                    <span className="font-extrabold">
                      {comment.user.nickname}
                    </span>
                    <span className="font-light whitespace-nowrap">
                      {parseDateWithSeconds(comment.createdAt)}
                    </span>
                  </div>
                  <div className="w-1/4 text-right p-2 flex justify-end items-center gap-2">
                    <button>댓글</button>
                    <button>
                      {userDidLike === 1 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 512 512"
                          style={{
                            fill: "rgb(18 215 97)",
                            width: "25px",
                            height: "25px",
                            fontSize: "1rem",
                            pointerEvents: "none",
                          }}
                        >
                          <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 512 512"
                          style={{
                            fill: "gray",
                            width: "25px",
                            height: "25px",
                            fontSize: "1rem",
                            pointerEvents: "none",
                          }}
                        >
                          <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-row w-full text-left py-2">
                  <div className="w-full flex flex-row justify-between items-center">
                    {comment.content
                      .split("\n")
                      .map((word: string, idx: number) => (
                        <React.Fragment key={idx}>
                          {word}
                          <br />
                        </React.Fragment>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="comments-write-box flex flex-col">
        <textarea
          name="comment"
          onChange={handleChange}
          value={commentData}
          className="border border-gray-300 w-full h-40 p-2 my-3 bg-gray-100 dark:bg-gray-600 text-white text-lg text-left"
          placeholder="댓글을 입력해 주세요"
        />
        <div className="flex justify-end">
          <button
            className="comment-submit w-32 h-8 bg-secondary hover:bg-primary hover:text-white rounded-xl"
            onClick={handleSubmit}
          >
            등록
          </button>
        </div>
      </div>
    </>
  );
}

export type TComments = {
  commentId: number;
  content: string;
  createdAt: string;
  delYn: string;
  user: { username: string; nickname: string };
}[];
