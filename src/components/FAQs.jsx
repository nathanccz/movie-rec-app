export default function FAQs() {
    return (
        <section className="mb-20"  
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="500">
            <h2 className="my-5 text-2xl font-bold px-3">Frequently Asked Question</h2>
            <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title text-xl font-medium">What does this app do?</div>
            <div className="collapse-content">
            <p>Good question! This is not your typical movie tracker. This app is like having a personalized movie recommender. It quietly learns about your tastes and offers recommendations that go beyond simple "like/dislike" algorithms. You'll get smart recommendations, plus titles that may surprise you.</p>
            </div>
            </div>
            <div className="collapse collapse-plus bg-base-200 hover:bg-slate-800 ease-in-out duration-500">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">How does this app learn about my watch habits? </div>
                <div className="collapse-content">
                <p>As you interact interact with this app, it will keep a discreet mood profile based on your ratings and your reviews. It uses this profile to fetch recommendations from ClaudeAI, one of the most advanced AI platforms today. Your personal information will never be used to generate recommendations.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">Can I opt out of profile tracking?</div>
                <div className="collapse-content">
                <p>Absolutely! Just go to settings and turn off the "Assist" setting. You'll still get recommendations based on your ratings, but your mood profile won't be tracked.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">What if I want a website or application like this one?</div>
                <div className="collapse-content">
                <p>Feel free to reach out at any time! I provide free consultations to see how I can help you!</p>
                </div>
            </div>
        </section>
    )
}