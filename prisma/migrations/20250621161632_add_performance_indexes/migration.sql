-- CreateIndex
CREATE INDEX "Message_projectUserId_idx" ON "Message"("projectUserId");

-- CreateIndex
CREATE INDEX "Note_slug_idx" ON "Note"("slug");

-- CreateIndex
CREATE INDEX "Note_createdAt_idx" ON "Note"("createdAt");

-- CreateIndex
CREATE INDEX "Note_tag_idx" ON "Note"("tag");

-- CreateIndex
CREATE INDEX "ProjectUser_userId_idx" ON "ProjectUser"("userId");

-- CreateIndex
CREATE INDEX "ProjectUser_projectname_idx" ON "ProjectUser"("projectname");

-- CreateIndex
CREATE INDEX "ProjectUser_userId_projectname_idx" ON "ProjectUser"("userId", "projectname");

-- CreateIndex
CREATE INDEX "SingleProject_projectSlug_idx" ON "SingleProject"("projectSlug");

-- CreateIndex
CREATE INDEX "SingleProject_isFeatured_idx" ON "SingleProject"("isFeatured");

-- CreateIndex
CREATE INDEX "SingleProject_projectType_idx" ON "SingleProject"("projectType");

-- CreateIndex
CREATE INDEX "SingleProject_isFeatured_projectType_idx" ON "SingleProject"("isFeatured", "projectType");

-- CreateIndex
CREATE INDEX "Social_userId_idx" ON "Social"("userId");

-- CreateIndex
CREATE INDEX "Step_projectId_idx" ON "Step"("projectId");

-- CreateIndex
CREATE INDEX "StepItem_stepId_idx" ON "StepItem"("stepId");

-- CreateIndex
CREATE INDEX "StepItem_slug_idx" ON "StepItem"("slug");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");
