import AbnTable from "../components/AbrTable";
import FilterNav from "../components/FilterNav";
import Search from "../components/Search";

const LandingPage = () => {
  return (
    <main className="main-container landing-page">
      <Search />
      <section className="secondary-container">
        <FilterNav />
        <AbnTable />
      </section>
    </main>
  );
};

export default LandingPage;
