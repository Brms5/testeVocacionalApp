"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function ApiDocPage() {
    const [spec, setSpec] = useState(null);

    useEffect(() => {
        fetch("/api/docs")
            .then((res) => res.json())
            .then((data) => setSpec(data));
    }, []);

    if (!spec) return <p>Loading...</p>;

    return <SwaggerUI spec={spec} />;
}
