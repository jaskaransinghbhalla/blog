import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../App";
import { Blog } from "../types";

export function useBlogs(): Blog[] {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const jwtToken = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${config.BACKEND_HOST}/api/v1/blog/bulk/`, {
        headers: {
          Authorization: `${jwtToken}`,
        },
      })
      .then((res) => {
        setBlogs(res.data);
      });
  }, []);
  return blogs;
}
export function useBlog(id: string): Blog {
  // Optimise here
  const [blog, setBlog] = useState<Blog>({
    authorId: "",
    content: "",
    id: "",
    title: "",
    published: false,
  });
  // Optimise here
  const jwtToken = localStorage.getItem("token");
  useEffect(() => {
    try {
      axios
        .get(`${config.BACKEND_HOST}/api/v1/blog/${id}`, {
          headers: {
            Authorization: `${jwtToken}`,
          },
        })
        .then((res) => {
          setBlog(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return blog;
}