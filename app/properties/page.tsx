import { fetchProperties } from "@/utils/requests";
import PropertySearchForm from "@/components/PropertySearchForm";
import Properties from "@/components/Properties";

export default async function PropertiesPage() {
  const properties = await fetchProperties();

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 ls:px-8">
          <PropertySearchForm />
        </div>
      </section>

      <Properties />
    </>
  );
}
