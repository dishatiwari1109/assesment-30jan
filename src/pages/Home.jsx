import React,{useState} from "react";
import { useDebounce } from "../hooks/useDebounce";
import { searchMovies } from "../services/api";
import MovieGrid from "../components/MovieGrid";
export default function Home() {
  return <>
    <MovieGrid className="m-4"/>
    <h1>hi</h1>
  </>
}