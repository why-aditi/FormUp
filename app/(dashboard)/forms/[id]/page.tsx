import FormLinkShare from "@/components/FormLinkShare";
import VisitBtn from "@/components/VisitBtn";
import React, { ReactNode } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { TbArrowBounce } from "react-icons/tb";
import { HiCursorClick } from "react-icons/hi";
import { ElementsType, FormElementInstance } from "@/components/FormElements";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDistance } from "date-fns";
import { GetFormById, GetFormWithSubmissions } from "@/actions/form";
import { StatsCards } from "../../page";

async function FormDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  // Fetch the form data
  const form = await GetFormById(Number(id));

  if (!form) {
    throw new Error("Form not found");
  }

  const { visits, submissions } = form;

  // Calculate submission rate and bounce rate
  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }
  const bounceRate = 100 - submissionRate;

  return (
    <>
      {/* Form Header */}
      <div className="border-b border-muted py-5 px-6">
        <div className="flex justify-between  ">
          <h1 className="text-3xl font-bold truncate">{form.name}</h1>
          <VisitBtn shareUrl={form.shareURL} />
        </div>
        </div>
        <div className="py-4 px-6 border-b border-muted">
          <div className="flex gap-2 items-center justify-between">
            <FormLinkShare shareUrl={form.shareURL} />
          </div>
      </div>
      <div className="w-full pt-8 gap-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 pb-6 px-6">
        <StatsCards
                title="Total visits"
                icon={<LuView className="text-blue-600" />}
                helperText="All time form visits"
                value={visits.toLocaleString() || ""}
                loading={false}
                className="shadow-md shadow-blue-600"
              />
              <StatsCards
                title="Total submissions"
                icon={<FaWpforms className="text-yellow-600" />}
                helperText="All time form submissions"
                value={submissions.toLocaleString() || ""}
                loading={false}
                className="shadow-md shadow-yellow-600"
              />
              <StatsCards
                title="Submission Rate"
                icon={<HiCursorClick className="text-green-600" />}
                helperText="Visits that result in form submission"
                value={submissionRate.toLocaleString()+"%" || ""}
                loading={false}
                className="shadow-md shadow-green-600"
              />
              <StatsCards
                title="Bounce Rate"
                icon={<TbArrowBounce className="text-red-600" />}
                helperText="Visits that leaves without interacting"
                value={bounceRate.toLocaleString()+"%" || ""}
                loading={false}
                className="shadow-md shadow-red-600"
              />
      </div>
      <div className="px-8">
        <SubmissionTable id={form.id} />

      </div>
    </>
  );
}

export default FormDetailPage;

type Row = {[key:string]:string} &{
  submittedAt:Date;
};

async function SubmissionTable({ id }: { id: number }) {
  const form = await GetFormWithSubmissions(id); 

  if (!form) {
      throw new Error("Form not found");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];
  const columns: { id: string; label: string; required: boolean; type: ElementsType }[] = [];

  formElements.forEach((element) => {
      switch (element.type) {
          case "TextField":
              columns.push({
                  id: element.id,
                  label: element.extraAttributes?.label || "Untitled",
                  required: element.extraAttributes?.required || false,
                  type: element.type,
              });
              break;
          default:
              break;
      }
  });

  const rows: Row[] = [];
  form.FormSubmissions.forEach((submission) => {
      const content = JSON.parse(submission.content);
      rows.push({
          ...content,
          submittedAt: submission.createdAt,
      });
  });

  return (
      <>
          <h1 className="text-2xl font-bold my-4">Submissions</h1>
          <div className="rounded-md border">
              <Table>
                  <TableHeader>
                      <TableRow>
                          {columns.map((column) => (
                              <TableHead key={column.id} className="uppercase">
                                  {column.label}
                              </TableHead>
                          ))}
                          <TableHead className="text-muted-foreground text-right uppercase">
                              Submitted at
                          </TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {rows.map((row, index) => (
                          <TableRow key={index}>
                              {columns.map((column) => (
                                  <RowCell key={column.id}
                                  type={column.type}
                                  value={row[column.id]}
                                  />
                              ))}
                              <TableCell className="text-muted-foreground text-right">
                                  {formatDistance(row.submittedAt, new Date(), { addSuffix: true })}
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </div>
      </>
  );
}

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  const node: ReactNode = value;
  return <TableCell>{node}</TableCell>;
}