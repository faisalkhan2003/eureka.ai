import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatAIText(rawText) {
  if (!rawText) return "";

  let text = rawText;
  text = text.replace(/^### (.*$)/gim, "### $1");
  text = text.replace(/^## (.*$)/gim, "## $1");
  text = text.replace(/^# (.*$)/gim, "# $1");
  text = text.replace(/\*\*(.*?)\*\*/gim, "**$1**");
  text = text.replace(/^\d+\.\s+(.*$)/gim, "1. $1");
  text = text.replace(/^[-*]\s+(.*$)/gim, "- $1");
  text = text.replace(/```(.*?)```/gms, "```$1```");

  return text.trim();
}