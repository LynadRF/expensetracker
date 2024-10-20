import Sidebar from "../components/Sidebar/Sidebar";
import useAuthRedirect from "../hooks/useAuthRedirect";

export default function Home() {
    useAuthRedirect("", "/login");
    return (
        <>
            <Sidebar />
            <main>
                Home
                <br />
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut, fugiat ipsa a quo error necessitatibus
                quae sunt omnis nihil ratione labore perferendis quisquam similique inventore, commodi facilis fugit
                optio vero. Suscipit eius aperiam quia et, accusantium necessitatibus! Exercitationem fugiat saepe
                sapiente consequuntur, dolorum facilis obcaecati at quaerat voluptas distinctio nesciunt sint pariatur
                facere ea reiciendis vero voluptatum, ad adipisci qui culpa suscipit architecto? Neque eveniet maiores
                similique corrupti voluptatibus tenetur ducimus quia officia illo repellendus at et ipsam sed, nulla
                atque dolores, velit facilis? Error, dicta. Quis, eligendi modi nisi eaque voluptatem adipisci aliquam
                ducimus molestias laudantium iste officia! Doloremque rerum repudiandae et officia hic? Nobis quae
                officia amet molestias nesciunt voluptas, sunt placeat nulla vel laborum. Quos, minus sunt, aspernatur
                voluptas accusamus voluptatum incidunt debitis et quidem placeat veniam optio pariatur quisquam, ducimus
                earum vel eos corrupti minima rerum sequi in iure alias magnam. Est non ipsum similique hic quibusdam
                laborum ad neque ducimus, necessitatibus voluptatum quos nesciunt perferendis unde expedita nam autem
                laudantium alias architecto sunt facilis quasi! Excepturi earum sint magni temporibus numquam?
                Perferendis, doloremque nisi. Id ratione aspernatur, explicabo natus deserunt corporis hic architecto
                possimus, sed expedita error iusto veniam est, mollitia eligendi ea autem temporibus omnis beatae earum
                repudiandae fuga dignissimos eaque! Dolorem, cumque labore expedita iste blanditiis autem! Rem modi
                incidunt, atque in molestias aliquam optio deserunt, numquam veniam error dolorum illum provident
                accusamus quibusdam repellendus! Aliquid nihil dolorem eveniet vitae dolorum beatae, maiores, iste esse
                impedit sunt dignissimos eius quas labore laboriosam nobis.
            </main>
        </>
    );
}
