"use client";
import { getLoggedInUser, getUserCompletetion } from "@/lib/auth/auth";
import { InternshipOrJob, UserType } from "@/types/user.types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

import { z } from "zod";

import { Skeleton } from "@/components/ui/skeleton";

import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import ProfilePictureUpload from "@/components/profile/ProfilePictureUpload";
import { Progress } from "@/components/ui/progress";
import { updateUser } from "@/lib/auth/auth.server";

export default function EditProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null | undefined>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completion, setCompletion] = useState<number>(0);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    oneLiner: "",
    location: "",
    whatworkingrn: "",
    internshipOrJob: InternshipOrJob.internship as InternshipOrJob,
    linkedIn: "",
    github: "",
    twitter: "",
  });

  useEffect(() => {
    getLoggedInUser(setUser);
  }, []);

  useEffect(() => {
    getUserCompletetion(user, setCompletion);
  }, [user]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        oneLiner: user.oneLiner || "",
        location: user.location || "",
        whatworkingrn: user.whatworkingrn || "",
        internshipOrJob:
          (user.internshipOrJob as unknown as InternshipOrJob) ||
          InternshipOrJob.job,
        linkedIn: user.socials?.linkedIn || "",
        github: user.socials?.github || "",
        twitter: user.socials?.twitter || "",
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="mt-[6rem] mx-auto max-w-7xl gap-5 px-4 mb-10 flex justify-between">
        <div className="w-[70%]">
          <Skeleton className="h-10 w-64 mb-6" />
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-7 w-40" />
              </CardHeader>
              <CardContent className="flex justify-center">
                <Skeleton className="h-32 w-32 rounded-full" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className="h-7 w-40" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className="h-7 w-40" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="w-[30%]">
          <Skeleton className="h-10 w-40 mb-6" />
          <Card className="mb-6 bg-transparent border-dotted border-4">
            <CardContent className="flex justify-center py-6">
              <Skeleton className="h-32 w-32 rounded-full" />
            </CardContent>
            <CardContent className="space-y-4 py-6">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-24" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      internshipOrJob: value as unknown as InternshipOrJob,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!user) return;
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const userFinal: UserType = {
        id: user.id,
        name: formData.name,
        email: user.email,
        username: user.username,
        pfp: user.pfp,
        oneLiner: formData.oneLiner,
        location: formData.location,
        whatworkingrn: formData.whatworkingrn,
        internshipOrJob: InternshipOrJob.internship,
        projectsNumber: user.projectsNumber,
        socials: {
          twitter: formData.twitter,
          github: formData.github,
          linkedIn: formData.linkedIn,
        },
        projects: user.projects,
      };

      const res = await updateUser(userFinal);
      if (!res) {
        toast.error("Error updating profile", {
          description: "There was an error updating your profile.",
        });
        return;
      }
      setUser(res);

      toast.success("Profile updated", {
        description: "Your profile has been updated successfully",
      });

      window.location.reload();
    } catch (error) {
      toast.error("Error updating profile", {
        description:
          "There was an error updating your profile. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-[6rem] mx-auto max-w-7xl gap-5 px-4 mb-10 flex justify-between">
      <div className=" w-[70%]">
        <h1 className="text-3xl font-bold manrope mb-6">Edit Profile</h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Profile Picture */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Profile Picture</h2>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="relative group">
                  <Avatar className="h-32 w-32 border-4 border-background">
                    <AvatarImage src={user.pfp} alt={user.name || "User"} />
                    <AvatarFallback className="text-4xl">
                      {user.name?.charAt(0) || user.username?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <ProfilePictureUpload userId={user.id} />
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Basic Information</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Your username"
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">
                    Username cannot be changed
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="oneLiner">Bio / One-liner</Label>
                  <Textarea
                    id="oneLiner"
                    name="oneLiner"
                    value={formData.oneLiner}
                    onChange={handleChange}
                    placeholder="A brief description about yourself"
                    rows={3}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="whatworkingrn">Current Work</Label>
                  <Input
                    id="whatworkingrn"
                    name="whatworkingrn"
                    value={formData.whatworkingrn}
                    onChange={handleChange}
                    placeholder="What are you working on right now?"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="internshipOrJob">You're Looking For</Label>
                  <Select
                    value={formData.internshipOrJob.toString()}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your InternshipOrJob" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="job">Full-time Job</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Social Links</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="linkedIn">LinkedIn Username</Label>
                  <div className="flex">
                    <span className="bg-muted px-3 py-2 text-sm border border-r-0 rounded-l-md">
                      linkedin.com/in/
                    </span>
                    <Input
                      id="linkedIn"
                      name="linkedIn"
                      value={formData.linkedIn}
                      onChange={handleChange}
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="github">GitHub Username</Label>
                  <div className="flex">
                    <span className="bg-muted px-3 py-2 text-sm border border-r-0 rounded-l-md">
                      github.com/
                    </span>
                    <Input
                      id="github"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="twitter">Twitter Username</Label>
                  <div className="flex">
                    <span className="bg-muted px-3 py-2 text-sm border border-r-0 rounded-l-md">
                      twitter.com/
                    </span>
                    <Input
                      id="twitter"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      className="rounded-l-none"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <Card>
              <CardFooter className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </div>
      <div className="w-[30%]">
        <h1 className="text-3xl font-bold mb-6 manrope">Your Profile</h1>
        <div className="mb-4">
          <Progress
            value={completion}
            className={`h-3 ${
              completion < 30
                ? "bg-red-200 [&>div]:bg-red-500"
                : completion < 70
                ? "bg-yellow-200 [&>div]:bg-yellow-500"
                : "bg-green-200 [&>div]:bg-green-500"
            }`}
          />
          <p className="text-xs text-right mt-1 text-muted-foreground">
            Profile completion:{" "}
            <span className="font-medium">{completion}%</span>
          </p>
        </div>
        <div className="space-y-6">
          {/* Profile Picture */}
          <Card className="mb-6 bg-transparent border-dotted border-4">
            <CardHeader>
              <h2 className="text-xl font-semibold">Profile Picture</h2>
            </CardHeader>
            <CardContent className="flex justify-center bg-transparent">
              <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-dotted border-background">
                  <AvatarImage src={user.pfp} alt={user.name || "User"} />
                  <AvatarFallback className="text-4xl">
                    {user.name?.charAt(0) || user.username?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </CardContent>

            <CardHeader>
              <h2 className="text-xl font-semibold">Basic Information</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">{formData.name || "Your Name"}</p>
                <p className="text-sm text-muted-foreground">
                  @{formData.username || "username"}
                </p>
              </div>
              <div>
                <p className="text-sm italic">
                  {formData.oneLiner || "No bio provided"}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-muted-foreground">📍</span>
                <span>{formData.location || "No location set"}</span>
              </div>
              <div>
                <p className="text-sm font-medium">Currently:</p>
                <p className="text-sm">
                  {formData.whatworkingrn || "Not specified"}
                </p>
              </div>
              <div>
                <span className="text-xs px-2 py-1 bg-secondary rounded-full border border-dotted">
                  {formData.internshipOrJob === InternshipOrJob.job
                    ? "Looking for a job"
                    : "Looking for an internship"}
                </span>
              </div>
            </CardContent>

            <CardHeader>
              <h2 className="text-xl font-semibold">Social Links</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.linkedIn && (
                <div className="flex items-center gap-2">
                  <FaLinkedinIn />
                  <a
                    href={`https://linkedin.com/in/${formData.linkedIn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                  >
                    {formData.linkedIn}
                  </a>
                </div>
              )}
              {formData.github && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-800 dark:text-white">
                    <FaGithub />
                  </span>
                  <a
                    href={`https://github.com/${formData.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                  >
                    {formData.github}
                  </a>
                </div>
              )}
              {formData.twitter && (
                <div className="flex items-center gap-2">
                  <FaTwitter />
                  <a
                    href={`https://twitter.com/${formData.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                  >
                    {formData.twitter}
                  </a>
                </div>
              )}
              {!formData.linkedIn && !formData.github && !formData.twitter && (
                <p className="text-sm text-muted-foreground">
                  No social links added
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
