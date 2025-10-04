"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import COMMON_SKILLS from "../data/skills";
import TIMEZONES from "../data/timezone";

export default function page() {
    const AVAILABILITY_OPTIONS = [
        "Weekday Mornings",
        "Weekday Afternoons",
        "Weekday Evenings",
        "Weekend Mornings",
        "Weekend Afternoons",
        "Weekend Evenings",
        "Flexible",
        "Specific Days",
        "24/7 Availability",
    ];

    const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const [role, setRole] = useState("");
    const [bio, setBio] = useState("");
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");
    const [showOtherInput, setShowOtherInput] = useState(false);
    const [otherSkillInput, setOtherSkillInput] = useState("");

    const [timezone, setTimezone] = useState("");
    const [timezoneInput, setTimezoneInput] = useState("");
    const [showOtherTimezoneInput, setShowOtherTimezoneInput] = useState(false);
    const [otherTimezoneInput, setOtherTimezoneInput] = useState("");
    const [hideTimezoneDropdown, setHideTimezoneDropdown] = useState(false);

    const [availability, setAvailability] = useState([]);
    const [specificDays, setSpecificDays] = useState([]);
    const [loading, setLoading] = useState(false);

    // --- Skills functions ---
    const addSkill = (skill) => {
        const trimmed = skill.trim();
        if (!trimmed) return;

        if (skills.includes(trimmed)) {
            toast.error("Skill already added!");
            return;
        }

        setSkills([...skills, trimmed]);
        setSkillInput("");
        setOtherSkillInput("");
        setShowOtherInput(false);
        toast.success("Skill added!");
    };

    const removeSkill = (skill) => setSkills(skills.filter((s) => s !== skill));

    // --- Availability ---
    const toggleAvailability = (slot) => {
        if (["Flexible", "24/7 Availability", "Specific Days"].includes(slot)) {
            setAvailability([slot]);
            if (slot !== "Specific Days") setSpecificDays([]);
        } else {
            if (availability.includes("Flexible") || availability.includes("24/7 Availability") || availability.includes("Specific Days")) return;
            setAvailability((prev) => prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]);
        }
    };

    const toggleSpecificDay = (day) => {
        setSpecificDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    // --- Submit ---
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check required fields
        const bioWordCount = bio.trim().split(/\s+/).length;
        if (!role || !bio || bio.length < 100 || bio.length > 999 || skills.length === 0 || !timezone || availability.length === 0) {
            toast.error("fill all required fields!");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            console.log({ role, bio, skills, timezone, availability, specificDays });
            setLoading(false);
            toast.success("Profile updated!");
        }, 1500);
    };

    // --- Filtered Skills ---
    const filteredSkills = [
        ...COMMON_SKILLS.filter(
            (s) =>
                s.toLowerCase().startsWith(skillInput.toLowerCase()) &&
                !skills.includes(s)
        ),
        ...COMMON_SKILLS.filter(
            (s) =>
                s.toLowerCase().includes(skillInput.toLowerCase()) &&
                !s.toLowerCase().startsWith(skillInput.toLowerCase()) &&
                !skills.includes(s)
        ),
    ].slice(0, 10);

    // --- Filtered Timezones ---
    const filteredTimezones = TIMEZONES.filter((tz) =>
        tz.toLowerCase().includes(timezoneInput.toLowerCase())
    ).slice(0, 10);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0e0e10] text-white p-4">
            <Toaster position="top-right" />
            <div className="w-full max-w-2xl bg-[#1a1a1d] p-8 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-semibold mb-2">Complete Your Profile</h2>
                <p className="text-gray-400 mb-6 text-sm">
                    Tell us about yourself to get personalized matches
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Role */}
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">I want to be a...</label>
                        <div className="grid grid-cols-2 gap-3">
                            {["mentor", "mentee"].map((r) => (
                                <button
                                    key={r}
                                    type="button"
                                    onClick={() => setRole(r)}
                                    className={`py-2 rounded-lg border capitalize ${role === r
                                        ? "bg-indigo-600 border-indigo-600"
                                        : "border-gray-600 hover:border-indigo-500"
                                        }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">Bio</label>
                        <textarea
                            placeholder="Tell us about yourself, your experience, and what you're looking for..."
                            value={bio}
                            onChange={(e) => e.target.value.length <= 999 && setBio(e.target.value)}
                            rows={6}
                            className="w-full bg-[#111113] text-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
                        />
                        <p className="text-gray-500 text-xs mt-1">
                            {bio.trim().split(/\s+/).length} words | {bio.length}/999 characters
                        </p>
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">Skills</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search a skill..."
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                className="w-full bg-[#111113] text-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />

                            {skillInput && !showOtherInput && (
                                <div className="absolute z-10 bg-[#1a1a1d] border border-gray-700 rounded-lg mt-1 max-h-48 overflow-y-auto w-full">
                                    {filteredSkills.map((skill) => (
                                        <div
                                            key={skill}
                                            onClick={() => addSkill(skill)}
                                            className="px-4 py-2 hover:bg-indigo-600 cursor-pointer text-sm"
                                        >
                                            {skill}
                                        </div>
                                    ))}
                                    {!skills.includes(skillInput) && (
                                        <div
                                            onClick={() => {
                                                setShowOtherInput(true);
                                                setSkillInput("");
                                            }}
                                            className="px-4 py-2 hover:bg-indigo-600 cursor-pointer text-sm font-semibold"
                                        >
                                            + Others
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {showOtherInput && (
                            <div className="flex gap-2 mt-2">
                                <input
                                    type="text"
                                    placeholder="Enter custom skill"
                                    value={otherSkillInput}
                                    onChange={(e) => setOtherSkillInput(e.target.value)}
                                    className="flex-1 bg-[#111113] text-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                />
                                <button
                                    type="button"
                                    onClick={() => addSkill(otherSkillInput)}
                                    className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700"
                                >
                                    Add
                                </button>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2 mt-3">
                            {skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="flex items-center gap-1 bg-indigo-600 px-3 py-1 rounded-full text-sm"
                                >
                                    {skill}
                                    <button
                                        type="button"
                                        onClick={() => removeSkill(skill)}
                                        className="text-white ml-1 hover:text-gray-200"
                                    >
                                        ✕
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Timezone */}
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">Timezone</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search or enter timezone..."
                                value={showOtherTimezoneInput ? otherTimezoneInput : timezoneInput}
                                onChange={(e) =>
                                    showOtherTimezoneInput
                                        ? setOtherTimezoneInput(e.target.value)
                                        : setTimezoneInput(e.target.value)
                                }
                                className="w-full bg-[#111113] text-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />

                            {/* Dropdown list: only show if not hidden */}
                            {!showOtherTimezoneInput && timezoneInput && !hideTimezoneDropdown && (
                                <div className="absolute z-10 bg-[#1a1a1d] border border-gray-700 rounded-lg mt-1 max-h-48 overflow-y-auto w-full">
                                    {TIMEZONES.filter((tz) =>
                                        tz.toLowerCase().includes(timezoneInput.toLowerCase())
                                    )
                                        .slice(0, 10)
                                        .map((tz) => (
                                            <div
                                                key={tz}
                                                onClick={() => {
                                                    setTimezone(tz);
                                                    setTimezoneInput(tz);
                                                    setHideTimezoneDropdown(true); // hide dropdown, input still visible
                                                }}
                                                className="px-4 py-2 hover:bg-indigo-600 cursor-pointer text-sm"
                                            >
                                                {tz}
                                            </div>
                                        ))}

                                    {!TIMEZONES.includes(timezoneInput) && (
                                        <div
                                            onClick={() => {
                                                setShowOtherTimezoneInput(true);
                                                setOtherTimezoneInput(timezoneInput);
                                                setTimezoneInput("");
                                                setHideTimezoneDropdown(true); // hide dropdown
                                            }}
                                            className="px-4 py-2 hover:bg-indigo-600 cursor-pointer text-sm font-semibold"
                                        >
                                            + Others
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Availability */}
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">Availability</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {AVAILABILITY_OPTIONS.map((slot) => (
                                <button
                                    key={slot}
                                    type="button"
                                    onClick={() => toggleAvailability(slot)}
                                    disabled={
                                        availability.includes("Flexible") ||
                                            availability.includes("24/7 Availability") ||
                                            availability.includes("Specific Days")
                                            ? !["Flexible", "24/7 Availability", "Specific Days"].includes(slot)
                                            : false
                                    }
                                    className={`py-2 rounded-lg border text-sm ${availability.includes(slot)
                                        ? "bg-indigo-600 border-indigo-600"
                                        : "border-gray-600 hover:border-indigo-500"
                                        } ${availability.includes(slot) ? "" : ""}
                                    `}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>

                        {/* Specific Days Picker */}
                        {availability.includes("Specific Days") && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {DAYS.map((day) => (
                                    <button
                                        key={day}
                                        type="button"
                                        onClick={() => toggleSpecificDay(day)}
                                        className={`py-1 px-3 rounded-lg border text-sm ${specificDays.includes(day)
                                            ? "bg-indigo-600 border-indigo-600"
                                            : "border-gray-600 hover:border-indigo-500"
                                            }`}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading || !role}
                        className={`w-full py-3 rounded-lg font-semibold transition ${loading
                            ? "bg-gray-700 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                    >
                        {loading ? "Saving..." : "Complete Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
}